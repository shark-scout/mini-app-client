"use client";

import { Button } from "@/components/ui/button";
import { posthogConfig } from "@/config/posthog";
import { useMiniApp } from "@neynar/react";
import { SwordsIcon } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";

export default function SharkBattlesPage() {
  const { context, actions } = useMiniApp();

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
          Hey, {context?.user.displayName || "shark"} 👋
        </h2>
        <h4 className="text-xl tracking-tight text-center mt-2">
          The crypto ocean is waiting, ready to prove you&apos;re the top shark?
        </h4>
        {/* Features */}
        <div className="flex flex-col gap-2 mt-6">
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
            emoji="🪙"
            title="Points"
            description="Earn points in every battle now — unlock rewards later"
          />
        </div>
        {/* Action */}
        <Button className="mt-6" onClick={handleOpenSharkBattles}>
          <SwordsIcon />
          Open Shark Battles!
        </Button>
      </div>
    </div>
  );
}

function SharkBattlesFeatureCard(props: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-row gap-2 bg-card border rounded-2xl p-4">
      <p className="text-4xl">{props.emoji}</p>
      <div className="flex flex-col gap-1">
        <p className="text-card-foreground font-bold">{props.title}</p>
        <p className="text-muted-foreground">{props.description}</p>
      </div>
    </div>
  );
}
