interface IUpdateUserParams extends ISignupParams {
  userId: string;
}

interface LoginParams {
  email: string;
  password: string;
}
interface LogInResponse {
  name: string;
  id: number;
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
  username?: string;
  id?: number;
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
  id: number;
};

type OutgoingRequestObj = {
  to: string;
  date: number;
  id: number;
  status: "confirmado" | "recusado" | "pendente";
};

type Employee = {
  cargo: string;
  Enum: number[];
  email: string;
  gestor: boolean;
  id: number;
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
  id: number;
  toFuncionario: Employee;
  turno: Shift;
  status: string;
};

type NewChangeRequest = {
  dataDaTroca: string;
  idFuncionarioSolicitado: number;
  idFuncionarioSolicitante: number;
  turnoDaTroca: Shift;
};

type Shift = "MANHA" | "TARDE" | "NOITE";
type Status = "confirmado" | "recusado" | "pendente";

type RequestReply = {
  trocaId: number;
  yesOrNo: string;
};
