import { Insight } from "@/types/insight";
import { Trend } from "./trend";

export type Dashboard = {
  trends: Trend[];
  insights: Insight[];
};
