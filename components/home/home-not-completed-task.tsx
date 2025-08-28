import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function HomeNotCompletedTask() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/cover-placeholder.png"
        alt="Cover"
        priority={false}
        width="100"
        height="100"
        sizes="100vw"
        className="w-full rounded-xl"
      />
      <h1 className="text-2xl font-bold mt-6">Analyzing the data...</h1>
      <p className="text-center mt-4">
        Querying thousands of wallets takes time, but the result is worth the
        wait
      </p>
      <p className="text-center mt-4">
        Hit the button below, and we&apos;ll serve you a notification when
        it&apos;s ready
      </p>
      <Button className="mt-6">
        <BellIcon />
        Enable Notifications
      </Button>
    </div>
  );
}
