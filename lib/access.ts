import { accessConfig } from "@/config/access";

export function isAccessible(fid?: number): boolean {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  if (!fid) {
    return false;
  }
  return accessConfig.fids.includes(fid);
}
