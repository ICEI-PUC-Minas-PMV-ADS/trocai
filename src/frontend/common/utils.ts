import { AxiosError } from "axios";
import { Dispatch } from "redux";
import setGlobalNotification from "../actions/globalNotificationActions";

export function handleErrors(dispatch: Dispatch, error: AxiosError): void {
  if (error.response) {
    const { data, status } = error.response;
    setGlobalNotification(dispatch, `${status}: ${data}`, "error");
  } else {
    setGlobalNotification(dispatch, error.message, "error");
  }
}

const baseUrl = "/";

export const ROUTES = {
  LOGIN: `${baseUrl}login`,
  SIGNUP: `${baseUrl}signup`,
  PROFILE: `${baseUrl}profile`,
  NEW_BIKE: `${baseUrl}newBike`,
  NEW_USER: `${baseUrl}newUser`,
  BIKES: `${baseUrl}bikes`,
  USERS: `${baseUrl}users`,
  RESERVATIONS: `${baseUrl}reservations`,
};

export const SESSION_DATA = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  ID: "_id",
  IS_MANAGER: "isManager",
  RESULT: "result",
  TOKEN: "token",
  PROFILE: "profile",
};
