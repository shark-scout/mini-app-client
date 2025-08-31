import { HomeCompletedTask } from "@/components/home/home-completed-task";
import { appConfig } from "@/config/app";
import { balancesUsdValueToDisplayData } from "@/lib/converters";
import { Metadata } from "next";

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
      title: appConfig.heroButtonTitle,
      action: {
        type: "launch_miniapp",
        url: appConfig.url,
        name: appConfig.name,
        splashImageUrl: appConfig.logoUrl,
        splashBackgroundColor: appConfig.logoBackgroundColor,
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

export default async function SharingUtilsPage({ searchParams }: Props) {
  const { balancesUsdValue } = await searchParams;

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <HomeCompletedTask balancesUsdValue={balancesUsdValue} />
    </main>
  );
}
