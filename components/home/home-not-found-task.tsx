import { demoTasks } from "@/demo/tasks";
import useError from "@/hooks/use-error";
import { Task } from "@/types/task";
import { useMiniApp } from "@neynar/react";
import { ArrowRight, Loader2Icon, RocketIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export function HomeNotFoundTask(props: { onTaskStart: (task: Task) => void }) {
  const { context } = useMiniApp();
  const { handleError } = useError();
  const [isProsessing, setIsProsessing] = useState(false);

  // TODO: Implement
  async function handleStartTask() {
    try {
      setIsProsessing(true);
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
        src="/images/cover-placeholder.png"
        alt="Cover"
        priority={false}
        width="100"
        height="100"
        sizes="100vw"
        className="w-full rounded-xl"
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
