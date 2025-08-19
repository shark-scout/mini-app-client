"use client";

import EntityList from "@/components/entity-list";
import { InsightCard } from "@/components/insights/insight-card";
import { TrendCard } from "@/components/trends/trend-card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import useError from "@/hooks/use-error";
import { userHasAccess } from "@/lib/access";
import { loadUserInsights, loadUserTrends } from "@/lib/data";
import { Insight } from "@/types/insight";
import { Trend } from "@/types/trend";
import { useMiniApp } from "@neynar/react";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { isSDKLoaded, context } = useMiniApp();
  const { handleError } = useError();
  const [trends, setTrends] = useState<Trend[] | undefined>();
  const [insights, setInsights] = useState<Insight[] | undefined>();

  useEffect(() => {
    if (isSDKLoaded) {
      loadUserTrends(context?.user.fid)
        .then((trends) => setTrends(trends))
        .catch((error) => {
          handleError(error, "Failed to load trends, try again later");
        });
      loadUserInsights(context?.user.fid)
        .then((insights) => setInsights(insights))
        .catch((error) => {
          handleError(error, "Failed to load insights, try again later");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSDKLoaded, context]);

  if (!trends || !insights) {
    return (
      <main className="flex flex-col items-center justify-center gap-2 px-4 py-8">
        <Loader2Icon className="animate-spin text-primary" />
        <p>Loading data...</p>
      </main>
    );
  }

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
        <p className="text-sm">
          SharkScout in closed beta. Want in? Just reach out to{" "}
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
      <Tabs defaultValue="trends">
        <TabsList className="w-full h-12">
          <TabsTrigger value="trends">
            📈 Trends{" "}
            {!userHasAccess(context?.user.fid) && (
              <div className="bg-accent rounded-lg px-1.5 py-0.5">
                <p className="text-sm font-bold">DEMO</p>
              </div>
            )}
          </TabsTrigger>
          <TabsTrigger value="insights">
            💡 AI insights{" "}
            {!userHasAccess(context?.user.fid) && (
              <div className="bg-accent rounded-lg px-1.5 py-0.5">
                <p className="text-sm font-bold">DEMO</p>
              </div>
            )}
          </TabsTrigger>
        </TabsList>
        {/* Trends tab */}
        <TabsContent value="trends">
          <EntityList<Trend>
            entities={trends}
            renderEntityCard={(trend, i) => <TrendCard key={i} trend={trend} />}
            noEntitiesText="No trends yet..."
            className="mt-4"
          />
        </TabsContent>
        {/* Insights tab */}
        <TabsContent value="insights">
          <EntityList<Insight>
            entities={insights}
            renderEntityCard={(insight, i) => (
              <InsightCard
                key={i}
                insight={insight}
                className={
                  i % 2 === 1
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground"
                }
              />
            )}
            noEntitiesText="No insights yet..."
            className="mt-4"
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
