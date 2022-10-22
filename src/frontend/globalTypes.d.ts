interface IUpdateUserParams extends ISignupParams {
  userId: string;
}

interface LoginParams {
  email: string;
  password: string;
}
interface LogInResponse {
  name: string;
  id: string;
  email: string;
}
interface ILoginParams {
  email: string;
  senha: string;
}

interface ISignupParams extends ILoginParams {
  firstName: string;
  lastName: string;
}

interface IlocalStorageProfile {
  result: string;
  token: string;
}
interface UserObject {
  result: IStorageResult;
  token: string;
}

interface IStorageResult extends ISignupParams {
  isManager: boolean;
  reservations: IReservation[];
  _id: string;
}

interface ITimestamps {
  start: number;
  end: number;
}

interface ISearchFilters {
  showUserWithReservation?: boolean;
  bikeRating: number;
}

type AssetType = "user" | "bike";

type GlobalNotificationType = "error" | "success";
interface IGlobalNotification {
  message: string;
  type: GlobalNotificationType;
}

type CrudReducerPossibleTypes = IBike | IReservation | IStorageResult;
interface ICrudReducerAction {
  type: string;
  payload: CrudReducerPossibleTypes[];
}

type IncomingRequestObj = {
  from: string;
  date: number;
  id: string;
};

type OutgoingRequestObj = {
  to: string;
  date: number;
  id: string;
  status: "confirmado" | "recusado" | "pendente";
};

type Employee = {
  cargo: string;
  Enum: number[];
  email: string;
  gestor: boolean;
  id: string;
  nome: string;
  nomeCompleto: string;
  pedidosDeTroca: ChangeRequest[];
  senha: string;
  sobreNome: string;
  telefone: string;
  turnoPrincipal: string;
};

type ChangeRequest = {
  dia: string;
  fromFuncionario: Employee;
  id: string;
  toFuncionario: Employee;
  turno: Shift;
};

type Shift = "MANHA" | "TARDE" | "NOITE";
