import { Task } from "@/types/task";

export function HomeCompletedTask(props: { task: Task }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">It&apos;s unbelievable!</h1>
      <p className="text-center mt-2">
        You and your followers collectively own...
      </p>
    </div>
  );
}
