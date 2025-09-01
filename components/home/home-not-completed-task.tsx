"use client";

import { baseConfig } from "@/config/base";
import { posthogConfig } from "@/config/posthog";
import { useMiniApp } from "@neynar/react";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function HomeNotCompletedTask() {
  const { context } = useMiniApp();
  const isBaseApp = context?.client.clientFid === baseConfig.clientFid;

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/processing.png"
        alt="Cover"
        priority={false}
        width="100"
        height="100"
        sizes="100vw"
        className="w-full rounded-md"
      />
      <h1 className="text-2xl font-bold mt-6">Analyzing the data... ⌛</h1>
      <p className="text-center mt-4">
        Querying thousands of wallets takes time, but the result is worth the
        wait
      </p>
      {isBaseApp ? (
        <HomeNotCompletedTaskBase />
      ) : (
        <HomeNotCompletedTaskFarcaster />
      )}
    </div>
  );
}

function HomeNotCompletedTaskFarcaster() {
  const { context, actions } = useMiniApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>();
  const added = context?.client.added;

  async function handleEnableNotifications() {
    posthog.capture(posthogConfig.events.enableNotificationsClicked);

    const result = await actions.addMiniApp();
    if (result?.notificationDetails) {
      posthog.capture(posthogConfig.events.notificationsEnabled);
      setNotificationsEnabled(true);
      toast.success("Notifications enabled");
    }
  }

  if (added || notificationsEnabled) {
    return (
      <p className="text-center mt-4">
        We&apos;ll serve you a notification when it&apos;s ready
      </p>
    );
  }

  return (
    <>
      <p className="text-center mt-4">
        Hit the button below, and we&apos;ll serve you a notification when
        it&apos;s ready
      </p>
      <Button onClick={handleEnableNotifications} className="mt-6">
        <BellIcon />
        Enable Notifications
      </Button>
    </>
  );
}

function HomeNotCompletedTaskBase() {
  return (
    <p className="text-center mt-4">
      Check back soon, and don&apos;t forget to save this app so you don&apos;t
      lose it
    </p>
  );
}
