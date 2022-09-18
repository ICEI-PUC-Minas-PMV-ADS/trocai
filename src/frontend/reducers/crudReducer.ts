interface ICrudReducerOptions {
  FETCH_ALL: string;
  CREATE: string;
  UPDATE: string;
  DELETE: string;
}

function crudReducer(
  assets: CrudReducerPossibleTypes[],
  action: ICrudReducerAction,
  reducerOptions: ICrudReducerOptions
): CrudReducerPossibleTypes[] {
  const { FETCH_ALL, CREATE, UPDATE, DELETE } = reducerOptions;
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...assets, action.payload[0]];
    case UPDATE:
      return assets.map((asset) =>
        asset._id === action.payload[0]._id ? action.payload[0] : asset
      );
    case DELETE:
      return assets.filter((asset) => asset._id !== action.payload[0]._id);
    default:
      return assets;
  }
}

export default crudReducer;
