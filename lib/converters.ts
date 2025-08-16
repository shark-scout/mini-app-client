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

export function addressToShortString(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
