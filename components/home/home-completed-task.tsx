"use client";

import { appConfig } from "@/config/app";
import { posthogConfig } from "@/config/posthog";
import { balancesUsdValueToDisplayData } from "@/lib/converters";
import { useMiniApp } from "@neynar/react";
import { PencilIcon, ShareIcon } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function HomeCompletedTask(props: {
  balancesUsdValue?: number | string;
}) {
  const { actions } = useMiniApp();

  const displayData = balancesUsdValueToDisplayData(props.balancesUsdValue);

  async function handleShareResult() {
    posthog.capture(posthogConfig.events.shareResultClicked);

    const result = await actions.composeCast({
      text: `${displayData.postPart1}\n\n${displayData.postPart2}\n\nWhat's your network's cap?`,
      embeds: [
        `${appConfig.url}/utils/sharing?balancesUsdValue=${props.balancesUsdValue}`,
      ],
    });
    if (result?.cast) {
      posthog.capture(posthogConfig.events.resultShared);
      toast.success("Result shared");
    }
  }

  async function handleGetPremium() {
    posthog.capture(posthogConfig.events.getPremiumClicked);
    await actions.viewProfile({ fid: appConfig.developer.fid });
  }

  return (
    <div className="flex flex-col items-center">
      <Image
        src={displayData.imagePath}
        alt="Cover"
        priority={false}
        width="100"
        height="100"
        sizes="100vw"
        className="w-full rounded-md"
      />
      <h1 className="text-2xl font-bold mt-6">It&apos;s unbelievable 🤯</h1>
      <p className="text-center mt-4 inline">
        {displayData.subtitle1.replaceAll("crypto", "")}
        <Button
          variant="link"
          onClick={() =>
            toast.info(
              "Calculation based on Base/Farcaster primary wallets in the Base network"
            )
          }
          className="text-base p-0"
        >
          crypto
        </Button>
      </p>
      <p className="text-center mt-4">{displayData.subtitle2}</p>
      <Button onClick={handleShareResult} className="mt-6">
        <ShareIcon /> Share The Result
      </Button>
      <Separator className="my-6" />
      <div className="w-full bg-accent rounded-md p-6">
        <div className="text-accent-foreground">
          <p className="font-semibold">Go Beyond the Memes!</p>
          <p className="text-3xl font-bold">Get Real Alpha!</p>
          <p className="mt-6">
            <span className="font-semibold">SharkScout Premium</span> turns your
            social graph into an alpha-generating machine
          </p>
        </div>
        <div className="flex flex-col gap-6 text-accent-foreground mt-6">
          <div>
            <p className="text-lg font-semibold">📈 Trends</p>
            <p className="mt-1">
              Track the exact moves your network is making: buys, sells, swaps,
              mints, and airdrops
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">💡 AI Insights</p>
            <p className="mt-1">
              Our AI analyzes your network to surface hidden gems, emerging
              narratives, and alpha opportunities
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">🔔 Smart Notifications</p>
            <p className="mt-1">
              Be the first to know about trending tokens, whale accumulations,
              and market-moving activities
            </p>
          </div>
        </div>
        <Button onClick={handleGetPremium} className="mt-6">
          <PencilIcon /> Contact {appConfig.developer.name} To Get Access
        </Button>
      </div>
    </div>
  );
}
