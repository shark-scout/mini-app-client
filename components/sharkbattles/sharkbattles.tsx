"use client";

import { Button } from "@/components/ui/button";
import { posthogConfig } from "@/config/posthog";
import { useMiniApp } from "@neynar/react";
import { SwordsIcon } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import { Separator } from "../ui/separator";
import { SharkBattlesFeatureCard } from "./sharkbattles-feature-card";

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
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Meet our new mini app —{" "}
            <span className="text-accent">Shark Battles</span>!
          </h2>
          <h4 className="text-xl tracking-tight text-center mt-2">
            Predict token growth, unite in squads, compete on the leaderboard,
            and win rewards!
          </h4>
        </div>
        <Separator className="my-6" />
        {/* Contest */}
        <div className="flex flex-col items-center">
          <p className="text-accent text-center font-bold">
            Contest reward pool is 9,000 $DEGEN
          </p>
          <p className="text-muted-foreground text-center mt-1">
            Sep 29 — Oct 5
          </p>
          <Button
            variant="default"
            className="mt-6"
            onClick={handleOpenSharkBattles}
          >
            <SwordsIcon />
            Open Shark Battles!
          </Button>
        </div>
        <Separator className="my-6" />
        {/* Features */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-2">
            <SharkBattlesFeatureCard
              emoji="🔮"
              title="Predict"
              description="Use all your hunting skills and choose a token you believe will have the highest growth in 24 hours"
            />
            <SharkBattlesFeatureCard
              emoji="🦈"
              title="Battle"
              description="Climb the leaderboard with your prediction, outplay other sharks, and discover your shark type"
            />
            <SharkBattlesFeatureCard
              emoji="👥"
              title="Squads"
              description="Invite your friends to make predictions — each one joins your squad and boosts your chances against rivals"
            />
            <SharkBattlesFeatureCard
              emoji="🏆"
              title="Contests"
              description="Earn points in every battle to compete for rewards in weekly contests"
            />
          </div>
          <Button
            variant="accent"
            className="mt-6"
            onClick={handleOpenSharkBattles}
          >
            <SwordsIcon />
            Open Shark Battles!
          </Button>
        </div>
      </div>
    </div>
  );
}
