import axios, { AxiosRequestConfig } from "axios";
import { set } from "lodash";
import { reduxStore } from "../reduxStore";
import API_PATHS from "./pathConstants";

const API = axios.create({
  baseURL: "https://bike-rental-manager.herokuapp.com/",
});

const TROCAI_PATHS = {
  employees: "api/v1/funcionarios",
  LOGIN: "api/v1/login",
  EMPLOYEE_BY_SHIFT: "api/v1/funcionarios/turno",
  CHANGE_REQUESTS: "api/v1/trocas",
};

const TROCAI_API = axios.create({
  baseURL: "https://trocai.azurewebsites.net/",
});

TROCAI_API.interceptors.request.use(async (req: AxiosRequestConfig) => {
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
  TROCAI_API.get(`${API_PATHS.USER}/${userId}`);
export const createUser = (
  newUser: ISignupParams
): Promise<{ data: UserObject }> =>
  TROCAI_API.post(`${API_PATHS.USER}/${API_PATHS.SIGNUP}`, newUser);

export const loginUser = async (
  user: ILoginParams
): Promise<{ data: UserObject }> =>
  TROCAI_API.post(`${TROCAI_PATHS.LOGIN}`, user);

export const updateUser = (
  updateduser: IUpdateUserParams
): Promise<IUserResponse> =>
  TROCAI_API.patch(`${API_PATHS.USER}/${updateduser.userId}`, updateduser);

export const deleteUser = (userId: string): Promise<Response> =>
  TROCAI_API.delete(`${API_PATHS.USER}/${userId}`);

interface IEmployeeResponse {
  data: Employee[];
}

export const fetchEmployees = (): Promise<IEmployeeResponse> =>
  TROCAI_API.get(TROCAI_PATHS.employees);

export const fetchEmployeesByShift = (
  shift: Shift
): Promise<IEmployeeResponse> =>
  TROCAI_API.get(TROCAI_PATHS.EMPLOYEE_BY_SHIFT, { params: { turno: shift } });
interface IChangeRequestResponse {
  data: ChangeRequest[];
}

export const fetchAllChangeRequest = (): Promise<IChangeRequestResponse> =>
  TROCAI_API.get(TROCAI_PATHS.CHANGE_REQUESTS);

export const createRequest = (
  newRequest: NewChangeRequest
): Promise<{ data: UserObject }> =>
  TROCAI_API.post(`${TROCAI_PATHS.CHANGE_REQUESTS}`, newRequest);
