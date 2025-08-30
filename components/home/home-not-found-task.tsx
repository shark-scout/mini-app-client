"use client";

import { backendConfig } from "@/config/backend";
import { demoTasks } from "@/demo/tasks";
import useError from "@/hooks/use-error";
import { Task } from "@/types/task";
import { useMiniApp } from "@neynar/react";
import axios from "axios";
import { Loader2Icon, RocketIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

export function HomeNotFoundTask(props: { onTaskStart: (task: Task) => void }) {
  const { isSDKLoaded, context } = useMiniApp();
  const { handleError } = useError();
  const [isProsessing, setIsProsessing] = useState(false);

  async function handleStartTask() {
    try {
      setIsProsessing(true);

      if (!isSDKLoaded) {
        throw new Error("SDK is not loaded yet");
      }

      const fid = context?.client.clientFid;
      if (!fid) {
        throw new Error("FID is not available");
      }

      await axios.post(`${backendConfig.url}/api/tasks/start`, { fid });

      props.onTaskStart(demoTasks.pending);
    } catch (error) {
      handleError(error, "Failed to start calculations, try again later");
    } finally {
      setIsProsessing(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/start.png"
        alt="Cover"
        priority={false}
        width="100"
        height="100"
        sizes="100vw"
        className="w-full rounded-md"
      />
      <h1 className="text-2xl font-bold mt-6">
        Gm, {context?.user.displayName || "shark"} 👋
      </h1>
      <p className="text-center mt-4">
        Ever wondered about the cap of your network?
      </p>
      <p className="text-center mt-4">
        We&apos;ll calculate the total value held by you and your followers and
        suggest something epic you could do with your money
      </p>
      <Button
        className="mt-6"
        disabled={isProsessing}
        onClick={handleStartTask}
      >
        {isProsessing ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <RocketIcon />
        )}
        Calculate Network Cap
      </Button>
    </div>
  );
}
