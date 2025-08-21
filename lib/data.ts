import { demoDashboard } from "@/demo/dashboard";
import { userHasAccess } from "./access";
import { Dashboard } from "@/types/dashboard";

export async function loadUserDashboard(fid?: number): Promise<Dashboard> {
  // Return demo dashboard if user is not found or does not have access
  if (!fid || !userHasAccess(fid)) {
    return demoDashboard;
  }

  // Else return empty dashboard
  return {
    trends: [],
    insights: [],
  };
}
