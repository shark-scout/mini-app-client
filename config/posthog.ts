export const posthogConfig = {
  events: {
    error: "error_occurred",
    taskLoaded: "task_loaded",
    startTaskClicked: "start_task_clicked",
    taskStarted: "task_started",
    enableNotificationsClicked: "enable_notifications_clicked",
    notificationsEnabled: "notifications_enabled",
    shareResultClicked: "share_result_clicked",
    resultShared: "result_shared",
    getPremiumClicked: "get_premium_clicked",
    openSharkBattlesClicked: "open_sharkbattles_clicked",
  },
  properties: {
    message: "message",
    error: "error",
    stack: "stack",
    task: "task",
    fid: "fid",
    clientFid: "client_fid",
  },
};
