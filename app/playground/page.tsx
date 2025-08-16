"use client";

import { Separator } from "@/components/ui/separator";
import { fakesConfig } from "@/config/fakes";
import { Trend } from "@/types/trend";
import { useMiniApp } from "@neynar/react";
import { useEffect, useState } from "react";

export default function PlaygroundPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <ContextPlayground />
      <Separator className="my-4" />
      <TrendsPlayground />
    </main>
  );
}

function ContextPlayground() {
  const { isSDKLoaded, context } = useMiniApp();

  return (
    <div className="flex flex-col gap-2">
      <p>Context:</p>
      {isSDKLoaded ? (
        <pre>{JSON.stringify(context, null, 2) || "Undefined"}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function TrendsPlayground() {
  const followingList = fakesConfig.followingList;
  const transactions = fakesConfig.transactions;
  const [trends, setTrends] = useState<Trend[] | undefined>();

  useEffect(() => {
    const trendsMap = new Map();

    transactions.forEach((transactionGroup) => {
      const { address, transactions } = transactionGroup;
      transactions
        .filter((tx) => tx.category === "token swap")
        .forEach((tx) => {
          const erc20Transfer = tx.erc20_transfers.find(
            (transfer) => transfer.to_address === address
          );
          if (erc20Transfer) {
            const key = erc20Transfer.address;
            if (!trendsMap.has(key)) {
              trendsMap.set(key, {
                tokenSymbol: erc20Transfer.token_symbol,
                tokenAddress: erc20Transfer.address,
                transactionHashes: [tx.hash],
                userFids: followingList
                  .filter((user) =>
                    (
                      user.user.verified_addresses.eth_addresses as string[]
                    ).includes(address)
                  )
                  .map((user) => user.user.fid),
              });
            } else {
              const existingTrend = trendsMap.get(key);
              existingTrend.transactionHashes.push(tx.hash);
              const userFids = followingList
                .filter((user) =>
                  (
                    user.user.verified_addresses.eth_addresses as string[]
                  ).includes(address)
                )
                .map((user) => user.user.fid);
              userFids.forEach((fid) => {
                if (!existingTrend.userFids.includes(fid)) {
                  existingTrend.userFids.push(fid);
                }
              });
            }
          }
        });
    });

    setTrends(Array.from(trendsMap.values()));
  }, [followingList, transactions]);

  return (
    <div className="flex flex-col items-start gap-2">
      <p>Trends:</p>
      <pre>{JSON.stringify(trends, null, 2) || "Undefined"}</pre>
    </div>
  );
}
