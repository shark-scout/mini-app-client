import { Task, TaskStatus } from "@/types/task";

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
    balancesUsdValue: 1234.56,
  },
};

export const demoTasks = {
  notFound: notFoundTask,
  pending: pendingTask,
  completed: completedTask,
};
