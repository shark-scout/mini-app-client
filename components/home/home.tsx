import { Task, TaskStatus } from "@/types/task";
import { HomeNotFoundTask } from "./home-not-found-task";
import { HomeCompletedTask } from "./home-completed-task";
import { HomeNotCompletedTask } from "./home-not-completed-task";

export function Home(props: {
  task: Task | null;
  onTaskUpdate: (task: Task) => void;
}) {
  if (props.task && props.task.status === TaskStatus.COMPLETED) {
    return (
      <HomeCompletedTask
        balancesUsdValue={props.task.result?.balancesUsdValue}
      />
    );
  }

  if (props.task && props.task.status !== TaskStatus.COMPLETED) {
    return <HomeNotCompletedTask />;
  }

  return <HomeNotFoundTask onTaskStart={props.onTaskUpdate} />;
}
