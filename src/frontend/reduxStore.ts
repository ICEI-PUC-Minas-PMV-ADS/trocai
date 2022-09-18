import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { PersistPartial } from "redux-persist/es/persistReducer";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import reducers from "./reducers";

export type RootState = {
  selectedUser: IStorageResult;
  loggedUser: UserObject;
  selectedTimestamps: ITimestamps;
  globalNotification: IGlobalNotification;
  searchFilters: ISearchFilters;
  users: IStorageResult[];
} & PersistPartial;
const persistConfig = {
  key: "root",
  storage: AsyncStorageLib,
  stateReconciler: hardSet,
  whiteList: ["loggedUser"],
};

const persistedReducer = persistReducer<RootState>(persistConfig, reducers);
export const reduxStore = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk))
);
export const persistor = persistStore(reduxStore);
