"use client";

import { Button } from "@/components/ui/button";
import { posthogConfig } from "@/config/posthog";
import { useMiniApp } from "@neynar/react";
import { WandSparklesIcon } from "lucide-react";
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
    <div className="h-[calc(100vh-6rem)] max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
      {/* Image */}
      <Image
        src="/images/shark-ids.png"
        alt="Shark IDs"
        priority={false}
        width="100"
        height="100"
        sizes="100vw"
        className="w-full rounded-md"
      />
      {/* Title, subtitle */}
      <h2 className="text-3xl text-accent font-bold tracking-tight balancetext-center mt-6">
        Mint your Shark ID!
      </h2>
      <h4 className="text-xl tracking-tight text-center mt-2">
        Discover your shark archetype, unlock your 2026 prediction, and join the
        Shark Battles airdrop!
      </h4>
      <Button
        variant="default"
        size="lg"
        className="mt-6"
        onClick={handleOpenSharkBattles}
      >
        <WandSparklesIcon />
        Mint Shark ID & Join Airdrop!
      </Button>
    </div>
  );
}
