import crudReducer from "./crudReducer";

export const USERS_REDUCER_OPTIONS = {
  FETCH_ALL: "FETCH_ALL_USERS",
  CREATE: "CREATE_USER",
  UPDATE: "UPDATE_USER",
  DELETE: "DELETE_USER",
};

const usersReducer = (
  users: IStorageResult[] = [],
  action: ICrudReducerAction = { type: "", payload: [] }
): IStorageResult[] =>
  crudReducer(users, action, USERS_REDUCER_OPTIONS) as IStorageResult[];

export default usersReducer;
