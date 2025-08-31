import { AxiosError } from "axios";

export function errorToString(error: unknown): string {
  let message = JSON.stringify(error, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
  if (error instanceof Error) {
    message = error.message;
  }
  if (error instanceof AxiosError) {
    message = JSON.stringify({
      status: error.response?.status,
      data: error.response?.data,
    });
  }
  return message;
}

export function balancesUsdValueToDisplayData(
  balancesUsdValue?: number | string
): {
  imagePath: string;
  subtitle1: string;
  subtitle2: string;
  postPart1: string;
  postPart2: string;
} {
  const value = Number(balancesUsdValue) || 0;
  const valueLocaleString = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  let imagePath = "/images/results/0.png";
  const subtitle1 = `You and your followers collectively own ${valueLocaleString} in crypto`;
  let subtitle2 = `If you sold it all, you could finally touch grass together and dream of a brighter future 🌱`;
  const postPart1 = `Just realized my followers and I collectively own ${valueLocaleString} in crypto 🤯`;
  let postPart2 = `If we sold it all, we could finally touch grass together and dream of a brighter future 🌱`;

  if (value > 0) {
    imagePath = "/images/results/over-0.png";
    subtitle2 = `If you sold it all, you could split a coffee and talk about our next 100x idea`;
    postPart2 =
      "If we sold it all, we could split a coffee and talk about our next 100x idea ☕";
  }

  if (value > 100) {
    imagePath = "/images/results/over-100.png";
    subtitle2 = `If you sold it all, you could fill a bathtub with lukewarm coffee and call it a "liquidity pool”`;
    postPart2 = `If we sold it all, we could fill a bathtub with lukewarm coffee and call it a "liquidity pool” ☕`;
  }

  if (value > 1000) {
    imagePath = "/images/results/over-1k.png";
    subtitle2 = `If you sold it all, you could sponsor a local cat shelter for a year and rename all the cats "Satoshi"`;
    postPart2 = `If we sold it all, we could sponsor a local cat shelter for a year and rename all the cats "Satoshi" 🐈`;
  }

  if (value > 2500) {
    imagePath = "/images/results/over-2.5k.png";
    subtitle2 = `If you sold it all, you could buy enough instant ramen to survive the next bear market in style`;
    postPart2 = `If we sold it all, we could buy enough instant ramen to survive the next bear market in style 🍜`;
  }

  if (value > 5000) {
    imagePath = "/images/results/over-5k.png";
    subtitle2 = `If you sold it all, you could buy a hot dog stand for a day and only accept payments in meme coins`;
    postPart2 = `If we sold it all, we could buy a hot dog stand for a day and only accept payments in meme coins 🌭`;
  }

  if (value > 7500) {
    imagePath = "/images/results/over-7.5k.png";
    subtitle2 = `If you sold it all, you could sponsor a local llama and give it an official title like "Chief Liquidity Officer"`;
    postPart2 = `If we sold it all, we could sponsor a local llama and give it an official title like "Chief Liquidity Officer" 🦙`;
  }

  if (value > 10 * 1000) {
    imagePath = "/images/results/over-10k.png";
    subtitle2 = `If you sold it all, you could build a giant, human-sized hamster wheel to help us visualize the endless market cycles`;
    postPart2 = `If we sold it all, we could build a giant, human-sized hamster wheel to help us visualize the endless market cycles 🎡`;
  }

  if (value > 25 * 1000) {
    imagePath = "/images/results/over-25k.png";
    subtitle2 = `If you sold it all, you could buy a mechanical bull and install it at the next crypto conference`;
    postPart2 = `If we sold it all, we could buy a mechanical bull and install it at the next crypto conference 🐂`;
  }

  if (value > 50 * 1000) {
    imagePath = "/images/results/over-50k.png";
    subtitle2 = `If you sold it all, you could rent a billboard in Times Square for 30 minutes to display our best shitposts`;
    postPart2 = `If we sold it all, we could rent a billboard in Times Square for 30 minutes to display our best shitposts 🌆`;
  }

  if (value > 100 * 1000) {
    imagePath = "/images/results/over-100k.png";
    subtitle2 = `If you sold it all, you could build a giant statue of the "this is fine" dog and place it outside the SEC's office`;
    postPart2 = `If we sold it all, we could build a giant statue of the "this is fine" dog and place it outside the SEC's office 🔥`;
  }

  if (value > 500 * 1000) {
    imagePath = "/images/results/over-500k.png";
    subtitle2 = `If you sold it all, you could attempt to buy the naming rights to a newly discovered star and call it "gm"`;
    postPart2 = `If we sold it all, we could attempt to buy the naming rights to a newly discovered star and call it "gm" ⭐`;
  }

  if (value > 1000 * 1000) {
    imagePath = "/images/results/over-1m.png";
    subtitle2 = `If you sold it all, you could buy a retired F-16 fighter jet and paint it purple with a giant "gm" on the tail`;
    postPart2 = `If we sold it all, we could buy a retired F-16 fighter jet and paint it purple with a giant "gm" on the tail ✈️`;
  }

  return {
    imagePath,
    subtitle1,
    subtitle2,
    postPart1,
    postPart2,
  };
}
