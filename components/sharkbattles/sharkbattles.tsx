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
    <div className="h-[calc(100vh-6rem)] max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
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
      <h2 className="text-3xl font-bold tracking-tight balance text-center mt-6">
        Meet our new mini app —{" "}
        <span className="text-accent">Shark Battles</span>!
      </h2>
      <h4 className="text-xl tracking-tight text-center mt-2">
        Predict token growth, battle other sharks, and win up to 5,000 $noice{" "}
        <span className="text-accent">every day</span>!
      </h4>
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
  );
}
