export const SELECTED_USER_REDUCER_OPTIONS = {
  SET_SELECTED_USER: "SET_SELECTED_USER",
};

const optionValues = Object.values(SELECTED_USER_REDUCER_OPTIONS);

interface IAction {
  payload: IStorageResult | null;
  type: typeof optionValues[number];
}

const defaultAction = { type: "", payload: null };

const selectedUserReducer = (
  selectedUser: IStorageResult | null = null,
  action: IAction = defaultAction
): IStorageResult | null => {
  const { SET_SELECTED_USER } = SELECTED_USER_REDUCER_OPTIONS;
  switch (action.type) {
    case SET_SELECTED_USER:
      return action.payload;
    default:
      return selectedUser;
  }
};

export default selectedUserReducer;
