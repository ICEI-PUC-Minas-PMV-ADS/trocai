import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as api from "../services/api";
import { LOGGED_USER_REDUCER_OPTIONS } from "../reducers/loggedUser";
import { USERS_REDUCER_OPTIONS } from "../reducers/usersReducer";
import { SELECTED_USER_REDUCER_OPTIONS } from "../reducers/selectedUserReducer";
import setGlobalNotification from "./globalNotificationActions";
import { handleErrors } from "../common/utils";
import { RootStackParamList } from "../types";

export const loginUser =
  (
    params: ILoginParams,
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">,
    setUserNotFound: (status: boolean) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setUserNotFound(false);

    try {
      const { data } = await api.loginUser(params);
      dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER, payload: data });
      setGlobalNotification(
        dispatch,
        `Hello, ${data.result.firstName}`,
        "success"
      );
      navigation.replace("Root");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("login user error", error);
      setUserNotFound(true);
    }
  };

export const createUser =
  (
    params: ISignupParams,
    navigation: NativeStackNavigationProp<
      RootStackParamList,
      "Signup" | "AddUser" | "EditProfile"
    >,
    login?: boolean
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.createUser(params);
      if (login) {
        dispatch({
          type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER,
          payload: data,
        });
        navigation.navigate("HomeScreen");
        setGlobalNotification(
          dispatch,
          `Welcome ${data.result.firstName}`,
          "success"
        );
      } else {
        dispatch({
          type: USERS_REDUCER_OPTIONS.CREATE,
          payload: [data.result],
        });
        navigation.navigate("UsersList");
        setGlobalNotification(dispatch, `User created sucessfuly`, "success");
      }
    } catch (error) {
      console.log("inside catch", error);

      handleErrors(dispatch, error as AxiosError);
    }
  };

export const fetchUsers =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchUsers();
      dispatch({ type: USERS_REDUCER_OPTIONS.FETCH_ALL, payload: data });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const fetchUser =
  (userId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchUser(userId);
      dispatch({
        type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
        payload: data,
      });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const updateUser =
  (
    updatedUser: IUpdateUserParams,
    navigation: NativeStackNavigationProp<
      RootStackParamList,
      "Signup" | "AddUser" | "EditProfile"
    >
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.updateUser(updatedUser);
      dispatch({ type: USERS_REDUCER_OPTIONS.UPDATE, payload: [data] });
      navigation.navigate("SelectedUser", { user: data });
      setGlobalNotification(dispatch, `User updated sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const deleteUser =
  (user: IStorageResult) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.deleteUser(user._id);
      dispatch({ type: USERS_REDUCER_OPTIONS.DELETE, payload: [user] });
      setGlobalNotification(dispatch, `User deleted sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };
