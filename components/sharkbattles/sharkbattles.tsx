"use client";

import { Button } from "@/components/ui/button";
import { posthogConfig } from "@/config/posthog";
import { useMiniApp } from "@neynar/react";
import { SwordsIcon } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";

export default function SharkBattles() {
  const { actions } = useMiniApp();

  async function handleOpenSharkBattles() {
    posthog.capture(posthogConfig.events.openSharkBattlesClicked);
    await actions.openMiniApp({
      url: "https://miniapp.sharkbattles.fun/",
    });
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        {/* Image */}
        <Image
          src="/images/sharkbattles.png"
          alt="Shark Battles"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full rounded-md"
        />
        {/* Title, subtitle */}
        <h2 className="text-3xl font-bold tracking-tight text-center mt-6">
          Meet our new mini app —{" "}
          <span className="text-accent">Shark Battles</span>!
        </h2>
        <h4 className="text-xl tracking-tight text-center mt-2">
          Predict token growth, unite in squads, compete on the leaderboard, and
          win rewards!
        </h4>
        {/* Contest */}
        <div className="w-full flex flex-col items-center bg-card border rounded-2xl p-4 mt-6">
          <p className="text-accent text-center font-bold">
            Contest reward pool is 9,000 $DEGEN
          </p>
          <p className="text-muted-foreground text-center mt-1">
            Sep 29 — Oct 5
          </p>
        </div>
        <Button
          variant="default"
          size="lg"
          className="mt-6"
          onClick={handleOpenSharkBattles}
        >
          <SwordsIcon />
          Open Shark Battles!
        </Button>
      </div>
    </div>
  );
}
