import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
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
    imageUrl: `${siteConfig.url}${displayData.imagePath}`,
    button: {
      title: `Calculate Your Network Cap`,
      action: {
        type: "launch_miniapp",
        url: siteConfig.url,
        name: siteConfig.name,
        splashImageUrl: `${siteConfig.url}/logo.png`,
        splashBackgroundColor: "#f8f9fa",
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
