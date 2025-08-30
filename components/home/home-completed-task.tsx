"use client";

import { appConfig } from "@/config/app";
import { balancesUsdValueToDisplayData } from "@/lib/converters";
import { useMiniApp } from "@neynar/react";
import { ShareIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function HomeCompletedTask(props: {
  balancesUsdValue?: number | string;
}) {
  const { isSDKLoaded, context, actions } = useMiniApp();

  const displayData = balancesUsdValueToDisplayData(props.balancesUsdValue);

  async function handleShareResult() {
    if (!isSDKLoaded) {
      toast.warning("SDK is not loaded yet");
      return;
    }

    if (!context?.client) {
      toast.warning("You need to be logged in to share the result");
      return;
    }

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
      {/* Add promo block */}
    </div>
  );
}
