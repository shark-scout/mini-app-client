"use client";

import { Home } from "@/components/home/home";
import { backendConfig } from "@/config/backend";
import useError from "@/hooks/use-error";
import { Task } from "@/types/task";
import { useMiniApp } from "@neynar/react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { isSDKLoaded, context } = useMiniApp();
  const { handleError } = useError();
  const [task, setTask] = useState<Task | null | undefined>();

  // Load task data
  useEffect(() => {
    // TODO: Remove this code before release
    if (process.env.NODE_ENV !== "development") {
      return;
    }
    const fid = context?.client.clientFid;
    if (isSDKLoaded && fid) {
      axios
        .get(`${backendConfig.url}/api/tasks/${fid}`)
        .then(({ data }) => setTask(data.task))
        .catch((error) => {
          // If 404 error, set task to null
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            setTask(null);
          } else {
            handleError(error, "Failed to load data, try again later");
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSDKLoaded, context]);

  // TODO: Remove this code before release
  if (process.env.NODE_ENV !== "development") {
    return (
      <main className="max-w-xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">⌛ Release soon...</h1>
        </div>
      </main>
    );
  }

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
