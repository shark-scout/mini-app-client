import { AxiosError } from "axios";

export function errorToString(error: unknown): string {
  let message = JSON.stringify(error, (key, value) =>
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

// TODO: Return real data
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
  let subtitle2 = "If you sold it all, you could buy nothing";
  const postPart1 = `Just realized my followers and I collectively own ${valueLocaleString} in crypto 🤯`;
  let postPart2 = "If we sold it all, we could buy nothing";

  if (value > 0) {
    imagePath = "/images/results/over-0.png";
    subtitle2 = "If you sold it all, you could buy something";
    postPart2 = "If we sold it all, we could buy something";
  }

  if (value > 100) {
    imagePath = "/images/results/over-100.png";
    subtitle2 = "If you sold it all, you could buy something";
    postPart2 = "If we sold it all, we could buy something";
  }

  if (value > 1000) {
    imagePath = "/images/results/over-1k.png";
    subtitle2 = `If you sold it all, you could hire a skywriter to draw a giant "gm" over the city`;
    postPart2 = `If we sold it all, we could hire a skywriter to draw a giant "gm" over the city.`;
  }

  return {
    imagePath,
    subtitle1,
    subtitle2,
    postPart1,
    postPart2,
  };
}
