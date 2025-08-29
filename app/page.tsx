"use client";

import { Home } from "@/components/home/home";
import { demoTasks } from "@/demo/tasks";
import { Task } from "@/types/task";
import { useMiniApp } from "@neynar/react";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { isSDKLoaded, context } = useMiniApp();
  const [task, setTask] = useState<Task | null | undefined>();

  console.log({ task });

  // Load task data
  // TODO: Implement
  useEffect(() => {
    if (isSDKLoaded) {
      setTask(demoTasks.notLoaded);
    }
  }, [isSDKLoaded, context]);

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
