import { RootStackParamList } from "./types";

export const MAIN_ROUTES: Record<
  keyof RootStackParamList,
  keyof RootStackParamList
> = {
  Root: "Root",
  NotFound: "NotFound",
  Login: "Login",
  Profile: "Profile",
  SelectedUser: "SelectedUser",
  EditProfile: "EditProfile",
  Signup: "Signup",
  AddUser: "AddUser",
  UsersList: "UsersList",
  HomeScreen: "HomeScreen",
  FreeShifts: "FreeShifts",
  MyRequests: "MyRequests",
  NewRequest: "NewRequest",
  RequestFromOthers: "RequestFromOthers",
};

export const filler = "erase later";
