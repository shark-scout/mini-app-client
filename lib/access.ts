import { accessConfig } from "@/config/access";

export function userHasAccess(fid: number | undefined): boolean {
  if (!fid) {
    return false;
  }
  return (
    accessConfig.developers.includes(fid) || accessConfig.users.includes(fid)
  );
}
