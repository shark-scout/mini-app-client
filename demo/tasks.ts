import { Task, TaskStatus } from "@/types/task";

const notLoadedTask = undefined;

const notFoundTask = null;

const pendingTask: Task = {
  status: TaskStatus.PENDING,
};

const completedTask: Task = {
  status: TaskStatus.COMPLETED,
  result: {
    followers: 50,
    filteredFollowers: 40,
    addresses: 40,
    createdBalances: 40,
    balances: 40,
    balancesUsdValue: 1234.56789,
  },
};

export const demoTasks = {
  notLoaded: notLoadedTask,
  notFound: notFoundTask,
  pending: pendingTask,
  completed: completedTask,
};
