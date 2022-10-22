import axios, { AxiosRequestConfig } from "axios";
import { set } from "lodash";
import { reduxStore } from "../reduxStore";
import API_PATHS from "./pathConstants";

const API = axios.create({
  baseURL: "https://bike-rental-manager.herokuapp.com/",
});

API.interceptors.request.use(async (req: AxiosRequestConfig) => {
  const store = reduxStore.getState();
  const profile = store.loggedUser;
  if (profile) {
    set(req, "headers.Authorization", `Bearer ${profile.token}`);
  }
  return req;
});

interface IUserResponse {
  data: IStorageResult;
}

export const fetchUsers = (): Promise<IUserResponse> => API.get(API_PATHS.USER);
export const fetchUser = (userId: string): Promise<IUserResponse> =>
  API.get(`${API_PATHS.USER}/${userId}`);
export const createUser = (
  newUser: ISignupParams
): Promise<{ data: UserObject }> =>
  API.post(`${API_PATHS.USER}/${API_PATHS.SIGNUP}`, newUser);
export const loginUser = async (
  user: ILoginParams
): Promise<{ data: UserObject }> =>
  API.post(`${API_PATHS.USER}/${API_PATHS.LOGIN}`, user);
export const updateUser = (
  updateduser: IUpdateUserParams
): Promise<IUserResponse> =>
  API.patch(`${API_PATHS.USER}/${updateduser.userId}`, updateduser);
  
export const deleteUser = (userId: string): Promise<Response> =>
  API.delete(`${API_PATHS.USER}/${userId}`);

interface IEmployeeResponse {
  data: Employee[];
}

const TROCAI_PATHS = {
  employees: "api/v1/funcionarios",
};

const TROCAI_API = axios.create({
  baseURL: "https://trocai.azurewebsites.net/",
});

export const fetchEmployees = (): Promise<IEmployeeResponse> =>
  TROCAI_API.get(TROCAI_PATHS.employees);

export const fetchEmployeesByShift = (
  shift: Shift
): Promise<IEmployeeResponse> => TROCAI_API.get(TROCAI_PATHS.employees, shift);
