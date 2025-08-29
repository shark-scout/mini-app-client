import { siteConfig } from "@/config/site";
import { balancesUsdValueToDisplayData } from "@/lib/converters";
import { Task } from "@/types/task";
import { useMiniApp } from "@neynar/react";
import { ShareIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export function HomeCompletedTask(props: { task: Task }) {
  const { actions } = useMiniApp();
  const displayData = balancesUsdValueToDisplayData(
    props.task.result?.balancesUsdValue
  );

  return (
    <div className="flex flex-col items-center">
      <Image
        src={displayData.imagePath}
        alt="Cover"
        priority={false}
        width="100"
        height="100"
        sizes="100vw"
        className="w-full rounded-xl"
      />
      <h1 className="text-2xl font-bold mt-6">It&apos;s unbelievable!</h1>
      {/* TODO: Add disclaimer */}
      <p className="text-center mt-4">{displayData.subtitle1}</p>
      <p className="text-center mt-4">{displayData.subtitle2}</p>
      <Button
        onClick={() =>
          actions.composeCast({
            text: `${displayData.postPart1}\n\n${displayData.postPart2}\n\nWhat's your network's cap?`,
            embeds: [
              `${siteConfig.url}/utils/sharing?balancesUsdValue=${props.task.result?.balancesUsdValue}`,
            ],
          })
        }
        className="mt-6"
      >
        <ShareIcon /> Share The Result
      </Button>
      {/* Add promo block */}
    </div>
  );
}
