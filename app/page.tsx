"use client";

import EntityList from "@/components/entity-list";
import { TrendCard } from "@/components/trends/trend-card";
import { Separator } from "@/components/ui/separator";
import { fakesConfig } from "@/config/fakes";
import { Trend } from "@/types/trend";

export default function HomePage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold">Welcome to SharkScout!</h1>
      <Separator className="my-4" />
      <EntityList<Trend>
        entities={fakesConfig.trends}
        renderEntityCard={(trend, i) => <TrendCard key={i} trend={trend} />}
        noEntitiesText="No trends yet..."
        className="mt-4"
      />
    </main>
  );
}
