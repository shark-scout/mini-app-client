"use client";

import { Home } from "@/components/home/home";
import { backendConfig } from "@/config/backend";
import { posthogConfig } from "@/config/posthog";
import useError from "@/hooks/use-error";
import { Task } from "@/types/task";
import { useMiniApp } from "@neynar/react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { context } = useMiniApp();
  const { handleError } = useError();
  const [task, setTask] = useState<Task | null | undefined>();

  // Load task data
  useEffect(() => {
    const fid = context?.user.fid;
    if (fid) {
      axios
        .get(`${backendConfig.url}/api/tasks/${fid}`)
        .then(({ data }) => {
          setTask(data.task);
          posthog.capture(posthogConfig.events.taskLoaded, {
            [posthogConfig.properties.task]: data.task,
          });
        })
        .catch((error) => {
          // If 404 error, set task to null
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            setTask(null);
            posthog.capture(posthogConfig.events.taskLoaded, {
              [posthogConfig.properties.task]: null,
            });
          } else {
            handleError(error, "Failed to load data, try again later");
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.user.fid]);

  // Display home if task is loaded
  if (task || task === null) {
    return (
      <main className="max-w-xl mx-auto px-4 py-8">
        <Home task={task} onTaskUpdate={setTask} />
      </main>
    );
  }

  // Display loading if task is not loaded
  return (
    <main className="flex flex-col items-center justify-center gap-2 px-4 py-8">
      <Loader2Icon className="animate-spin text-primary" />
      <p>Loading...</p>
    </main>
  );
}
