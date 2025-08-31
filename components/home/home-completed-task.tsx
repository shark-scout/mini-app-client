"use client";

import { appConfig } from "@/config/app";
import { balancesUsdValueToDisplayData } from "@/lib/converters";
import { useMiniApp } from "@neynar/react";
import { PencilIcon, ShareIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function HomeCompletedTask(props: {
  balancesUsdValue?: number | string;
}) {
  const { actions } = useMiniApp();

  const displayData = balancesUsdValueToDisplayData(props.balancesUsdValue);

  async function handleShareResult() {
    const result = await actions.composeCast({
      text: `${displayData.postPart1}\n\n${displayData.postPart2}\n\nWhat's your network's cap?`,
      embeds: [
        `${appConfig.url}/utils/sharing?balancesUsdValue=${props.balancesUsdValue}`,
      ],
    });
    if (result?.cast) {
      toast.success("Result shared");
    }
  }

  async function handleGetPremium() {
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
      {/* TODO: Add disclaimer */}
      <p className="text-center mt-4">{displayData.subtitle1}</p>
      <p className="text-center mt-4">{displayData.subtitle2}</p>
      <Button onClick={handleShareResult} className="mt-6">
        <ShareIcon /> Share The Result
      </Button>
      <Separator className="my-6" />
      <div className="w-full bg-primary rounded-md p-4">
        <div className="flex flex-col gap-1 text-primary-foreground">
          <p className="text-2xl font-bold">Go Beyond the Memes!</p>
          <p className="text-xl font-semibold">Get Real Alpha!</p>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4 text-primary-foreground mt-2">
          <p>
            SharkScout Premium turns your social graph into an alpha-generating
            machine{" "}
          </p>
          <p>
            📈 Network Trading Trends: See what your network is buying/selling
            in real-time
          </p>
          <p>
            🤖 AI Insights: Get signals on which wallets are making the smartest
            moves
          </p>
          <p>
            🔔 Smart Alerts: Get notified when a key account makes a big trade
          </p>
        </div>
        <Button variant="secondary" onClick={handleGetPremium} className="mt-4">
          <PencilIcon /> Contact {appConfig.developer.name} To Get Access
        </Button>
      </div>
    </div>
  );
}
