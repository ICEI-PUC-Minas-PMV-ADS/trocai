export const GLOBAL_NOTIFICATION_REDUCER_OPTIONS = {
  SET_GLOBAL_NOTIFICATION: "SET_GLOBAL_NOTIFICATION",
};

const optionValues = Object.values(GLOBAL_NOTIFICATION_REDUCER_OPTIONS);

interface IAction {
  payload: IGlobalNotification;
  type: typeof optionValues[number];
}

const globalNotificationReducer = (
  globalNotification: IGlobalNotification = { message: "", type: "success" },
  action: IAction = { type: "", payload: { message: "", type: "success" } }
): IGlobalNotification => {
  const { SET_GLOBAL_NOTIFICATION } = GLOBAL_NOTIFICATION_REDUCER_OPTIONS;
  switch (action.type) {
    case SET_GLOBAL_NOTIFICATION:
      return action.payload;
    default:
      return globalNotification;
  }
};

export default globalNotificationReducer;
