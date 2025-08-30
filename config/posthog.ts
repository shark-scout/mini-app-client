export const posthogConfig = {
  events: {
    error: "error_occurred",
    taskLoaded: "task_loaded",
  },
  properties: {
    message: "message",
    error: "error",
    stack: "stack",
    task: "task",
  },
};
