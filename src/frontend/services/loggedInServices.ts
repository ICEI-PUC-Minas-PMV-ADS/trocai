import jwtDecode from "jwt-decode";
import { reduxStore } from "../reduxStore";

interface IDecodedToken {
  name: string;
  exp: number;
}

export async function checkIfTokenIsExpired(): Promise<boolean> {
  const state = reduxStore.getState();
  const user = state?.loggedUser;
  if (!user?.token) return true;

  const decodedToken = jwtDecode<IDecodedToken>(user.token);
  const timeNowInMilisseconds = new Date().getTime();
  const tokenExpireDateInMilisseconds = decodedToken.exp * 1000;
  if (tokenExpireDateInMilisseconds < timeNowInMilisseconds) return true;
  return false;
}

export default checkIfTokenIsExpired;
