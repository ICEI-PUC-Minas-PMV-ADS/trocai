import { combineReducers } from "redux";
import loggedUserReducer from "./loggedUser";
import selectedUserReducer from "./selectedUserReducer";
import usersReducer from "./usersReducer";
import searchFiltersReducer from "./searchFiltersReducer";
import globalNotificationReducer from "./globalNotificationReducer";

export default combineReducers({
  selectedUser: selectedUserReducer,
  loggedUser: loggedUserReducer,
  users: usersReducer,
  searchFilters: searchFiltersReducer,
  globalNotification: globalNotificationReducer,
});
