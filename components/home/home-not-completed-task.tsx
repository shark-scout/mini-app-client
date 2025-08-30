"use client";

import { useMiniApp } from "@neynar/react";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function HomeNotCompletedTask() {
  const { isSDKLoaded, context, actions } = useMiniApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    context?.client.added || false
  );

  async function handleEnableNotifications() {
    if (!isSDKLoaded) {
      toast.warning("SDK is not loaded yet");
      return;
    }

    if (!context?.client) {
      toast.warning("You need to be logged in to share the result");
      return;
    }

    const result = await actions.addMiniApp();
    if (result?.notificationDetails) {
      setNotificationsEnabled(true);
      toast.success("Notifications enabled");
    }
  }

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
      {notificationsEnabled ? (
        <p className="text-center mt-4">
          We&apos;ll serve you a notification when it&apos;s ready
        </p>
      ) : (
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
      )}
    </div>
  );
}
