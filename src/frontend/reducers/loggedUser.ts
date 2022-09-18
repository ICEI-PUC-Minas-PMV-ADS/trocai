export const LOGGED_USER_REDUCER_OPTIONS = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

const optionValues = Object.values(LOGGED_USER_REDUCER_OPTIONS);

interface IAction {
  payload: UserObject | null;
  type: typeof optionValues[number];
}

const defaultAction = { type: "", payload: null };

const loggedUserReducer = (
  loggedUser: UserObject | null = null,
  action: IAction = defaultAction
): UserObject | null => {
  const { LOGIN_USER, LOGOUT_USER } = LOGGED_USER_REDUCER_OPTIONS;
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return null;
    default:
      return loggedUser;
  }
};

export default loggedUserReducer;
