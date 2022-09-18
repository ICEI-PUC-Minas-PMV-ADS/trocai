import { Dispatch } from "redux";
import { GLOBAL_NOTIFICATION_REDUCER_OPTIONS } from "../reducers/globalNotificationReducer";

const setGlobalNotification = (
  dispatch: Dispatch,
  message: string,
  type: GlobalNotificationType
) => {
  const { SET_GLOBAL_NOTIFICATION } = GLOBAL_NOTIFICATION_REDUCER_OPTIONS;

  dispatch({ type: SET_GLOBAL_NOTIFICATION, payload: { message, type } });
};

export default setGlobalNotification;
