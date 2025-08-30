import { devConfig } from "@/config/dev";

export function isUserDev(fid: number | undefined): boolean {
  if (!fid) {
    return false;
  }
  return devConfig.devUserFids.includes(fid);
}
