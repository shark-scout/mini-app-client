import { fakeTrends } from "@/fakes/fake-trends";
import { FollowingListUser } from "@/types/following-list-user";
import { Price } from "@/types/price";
import { Transaction } from "@/types/transaction";
import { Trend } from "@/types/trend";
import axios from "axios";
import { userHasAccess } from "./access";
import { Insight } from "@/types/insight";
import { fakeInsights } from "@/fakes/fake-insights";

// TODO: Implement
async function loadFollowingListUsers(
  fid: number
): Promise<FollowingListUser[]> {
  console.log("Loading following list users...");
  return [];
}

async function loadFollowingListUserTransactions(
  followingListUsers: FollowingListUser[]
): Promise<
  {
    address: string;
    transactions: Transaction[];
  }[]
> {
  console.log("Loading following list user transactions...");

  const followingListUserTransactions: {
    address: string;
    transactions: Transaction[];
  }[] = [];

  // Calculate epoch timestamp for 2 days ago (current time minus 48 hours)
  const fromDate = Math.floor(
    (Date.now() - 24 * 60 * 60 * 1000) / 1000
  ).toString();

  // Fetch transaction history for each address
  for (const user of followingListUsers) {
    for (const address of user.user.verified_addresses.eth_addresses) {
      const { data } = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?chain=base&from_date=${fromDate}&order=DESC`,
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          },
        }
      );

      followingListUserTransactions.push({
        address,
        transactions: data.result,
      });
    }
  }

  return followingListUserTransactions;
}

async function loadPrices(trends: Trend[]): Promise<Price[]> {
  console.log("Loading prices...");

  const body = {
    tokens: trends.map((trend) => ({
      token_address: trend.token.address,
    })),
  };

  const { data } = await axios.post(
    "https://deep-index.moralis.io/api/v2.2/erc20/prices?chain=base",
    body,
    {
      headers: {
        "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      },
    }
  );

  return data;
}

function loadTrends(
  followingListUsers: FollowingListUser[],
  followingListUserTransactions: {
    address: string;
    transactions: Transaction[];
  }[]
): Trend[] {
  const tokenBuys: Map<
    string,
    {
      token: {
        symbol: string;
        address: string;
        logo: string | null;
      };
      transactions: {
        hash: string;
        valueFormatted: string;
      }[];
      users: {
        fid: number;
        username: string;
        pfp_url: string;
      }[];
    }
  > = new Map();

  // Create a lookup map for user info by address
  const userLookup = new Map<string, FollowingListUser>();
  followingListUsers.forEach((followingUser) => {
    // Map all verified addresses to the user
    followingUser.user.verified_addresses.eth_addresses.forEach((address) => {
      userLookup.set(address.toLowerCase(), followingUser);
    });
  });

  // Process each user's transactions
  followingListUserTransactions.forEach(({ address, transactions }) => {
    const userAddress = address.toLowerCase();
    const user = userLookup.get(userAddress);

    if (!user) return; // Skip if user not found

    transactions.forEach((transaction) => {
      // Only look at token swap transactions
      if (transaction.category !== "token swap") return;

      // Find ERC20 transfers where user received tokens (bought)
      transaction.erc20_transfers.forEach((transfer) => {
        if (transfer.to_address.toLowerCase() === userAddress) {
          const tokenAddress = transfer.address.toLowerCase();

          if (!tokenBuys.has(tokenAddress)) {
            tokenBuys.set(tokenAddress, {
              token: {
                symbol: transfer.token_symbol,
                address: transfer.address,
                logo: transfer.token_logo,
              },
              transactions: [],
              users: [],
            });
          }

          const tokenData = tokenBuys.get(tokenAddress)!;

          // Add transaction hash if not already present
          if (
            !tokenData.transactions.some((tx) => tx.hash === transaction.hash)
          ) {
            tokenData.transactions.push({
              hash: transaction.hash,
              valueFormatted: transfer.value_formatted,
            });
          }

          // Add user if not already present
          const userInfo = {
            fid: user.user.fid,
            username: user.user.username,
            pfp_url: user.user.pfp_url,
          };

          if (!tokenData.users.some((u) => u.fid === userInfo.fid)) {
            tokenData.users.push(userInfo);
          }
        }
      });
    });
  });

  // Convert to Trend array
  const trends = Array.from(tokenBuys.values()).map((tokenData) => ({
    token: tokenData.token,
    transactions: tokenData.transactions,
    users: tokenData.users,
    // volume field is intentionally omitted as per requirements
  }));

  // // Sort trends by transactions number
  trends.sort((a, b) => b.users.length - a.users.length);

  return trends;
}

async function loadTrendVolumes(
  trends: Trend[],
  prices: Price[]
): Promise<Trend[]> {
  console.log("Loading trend volumes...");

  // Create a map for quick price lookup by token address
  const priceMap = new Map<string, Price>();
  prices.forEach((price) => {
    priceMap.set(price.tokenAddress.toLowerCase(), price);
  });

  // Calculate volume for each trend
  return trends.map((trend) => {
    const price = priceMap.get(trend.token.address.toLowerCase());

    if (!price) {
      // If no price found, set volume to 0
      return {
        ...trend,
        volume: {
          usd: 0,
        },
      };
    }

    // Calculate total volume by summing all transaction values multiplied by USD price
    const totalVolumeUsd = trend.transactions.reduce((sum, transaction) => {
      const valueFormatted = parseFloat(transaction.valueFormatted);
      const transactionUsdValue = valueFormatted * price.usdPrice;
      return sum + transactionUsdValue;
    }, 0);

    return {
      ...trend,
      volume: {
        usd: totalVolumeUsd,
      },
    };
  });
}

export async function loadUserTrends(
  fid: number | undefined
): Promise<Trend[]> {
  // Return fake trends if user is not found or does not have access
  if (!fid || !userHasAccess(fid)) {
    return fakeTrends;
  }

  // Load following list users and their transactions
  const followingListUsers = await loadFollowingListUsers(fid);
  const followingListUserTransactions = await loadFollowingListUserTransactions(
    followingListUsers
  );

  // Load trends
  let trends: Trend[] = loadTrends(
    followingListUsers,
    followingListUserTransactions
  );

  // Load prices
  const prices = await loadPrices(trends);

  // Load trend volumes
  trends = await loadTrendVolumes(trends, prices);

  return trends;
}

// TODO: Implement
export async function loadUserInsights(
  fid: number | undefined
): Promise<Insight[]> {
  // Return fake insights if user is not found or does not have access
  if (!fid || !userHasAccess(fid)) {
    return fakeInsights;
  }

  return [];
}
