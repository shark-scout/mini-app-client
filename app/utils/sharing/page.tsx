import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app";
import { balancesUsdValueToDisplayData } from "@/lib/converters";
import { HomeIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ balancesUsdValue?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { balancesUsdValue } = await searchParams;
  const displayData = balancesUsdValueToDisplayData(balancesUsdValue);

  const fcMetadata = {
    version: "1",
    imageUrl: `${appConfig.url}${displayData.imagePath}`,
    button: {
      title: appConfig.buttonTitle,
      action: {
        type: "launch_miniapp",
        url: appConfig.url,
        name: appConfig.name,
        splashImageUrl: appConfig.splashImageUrl,
        splashBackgroundColor: appConfig.splashBackgroundColor,
      },
    },
  };

  return {
    other: {
      "fc:miniapp": JSON.stringify(fcMetadata),
      "fc:frame": JSON.stringify(fcMetadata),
    },
  };
}

export default async function SharingUtilsPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-2 px-4 py-8">
      <div className="flex flex-col items-center">
        <Link href="/">
          <Button>
            <HomeIcon /> Go To Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
