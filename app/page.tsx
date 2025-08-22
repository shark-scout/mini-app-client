"use client";

import EntityList from "@/components/entity-list";
import { InsightCard } from "@/components/insights/insight-card";
import { TrendCard } from "@/components/trends/trend-card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import useError from "@/hooks/use-error";
import { loadUserDashboard } from "@/lib/data";
import { Dashboard } from "@/types/dashboard";
import { Insight } from "@/types/insight";
import { Trend } from "@/types/trend";
import { useMiniApp } from "@neynar/react";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { isSDKLoaded, context } = useMiniApp();
  const { handleError } = useError();
  const [dashboard, setDashboard] = useState<Dashboard | undefined>();

  useEffect(() => {
    if (isSDKLoaded) {
      loadUserDashboard(context?.user.fid)
        .then((dashboard) => setDashboard(dashboard))
        .catch((error) => {
          handleError(error, "Failed to load dashboard, try again later");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSDKLoaded, context]);

  if (!dashboard) {
    return (
      <main className="flex flex-col items-center justify-center gap-2 px-4 py-8">
        <Loader2Icon className="animate-spin text-primary" />
        <p>Loading data...</p>
      </main>
    );
  }

  const trends = dashboard.trends.sort(
    (a, b) =>
      b.users.length - a.users.length || Number(b.value) - Number(a.value)
  );
  const buyTrends = trends.filter((trend) => trend.type === "buy");
  const sellTrends = trends.filter((trend) => trend.type === "sell");

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      {/* Welcome message */}
      <div>
        <h1 className="text-2xl font-bold">
          Gm, {context?.user.displayName || "shark"} 👋
        </h1>
        <p className="mt-2">
          We turn your following list on Base & Farcaster into real-time market
          insights, so you can spot trends before they go mainstream
        </p>
      </div>
      {/* Closed beta message */}
      <div className="border-2 border-primary rounded-2xl px-4 py-2 mt-4">
        <p className="text-sm">SharkScout is in closed beta.</p>
        <p className="text-sm mt-2">
          The data you see comes from the{" "}
          <Link
            href="https://farcaster.xyz/~/channel/sharks"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary"
          >
            Sharks
          </Link>{" "}
          community for the last 24 hours.
        </p>
        <p className="text-sm mt-2">
          Want personalized trends and insights from the people you follow?
          Reach out to{" "}
          <Link
            href={siteConfig.links.farcaster}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary"
          >
            @kiv1n
          </Link>{" "}
          for access!
        </p>
      </div>
      <Separator className="my-4" />
      {/* Tabs */}
      <Tabs defaultValue="buyTrends">
        <TabsList className="w-full h-12">
          <TabsTrigger value="buyTrends">🟢 Buying</TabsTrigger>
          <TabsTrigger value="sellTrends">🔴 Selling</TabsTrigger>
          <TabsTrigger value="insights">💡 Insights</TabsTrigger>
        </TabsList>
        {/* Buy trends tab */}
        <TabsContent value="buyTrends">
          <EntityList<Trend>
            entities={buyTrends.slice(0, 50)}
            renderEntityCard={(trend, i) => (
              <TrendCard key={i} trend={trend} avatarClassName="ring-accent" />
            )}
            noEntitiesText="No buy trends yet..."
            className="mt-4"
          />
        </TabsContent>
        {/* Sell trends tab */}
        <TabsContent value="sellTrends">
          <EntityList<Trend>
            entities={sellTrends.slice(0, 50)}
            renderEntityCard={(trend, i) => <TrendCard key={i} trend={trend} />}
            noEntitiesText="No sell trends yet..."
            className="mt-4"
          />
        </TabsContent>
        {/* Insights tab */}
        <TabsContent value="insights">
          <EntityList<Insight>
            entities={dashboard.insights}
            renderEntityCard={(insight, i) => (
              <InsightCard key={i} insight={insight} fid={context?.user.fid} />
            )}
            noEntitiesText="No insights yet..."
            className="mt-4"
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
