import { LogState, LogActionTypes, GET_LOGS } from '../types';

const initialState: LogState = {
  logs: [],
};
const logReducer = (state = initialState, action: LogActionTypes): LogState => {
  switch (action.type) {
    case GET_LOGS:
      return Object.assign({}, state, {
        logs: action.payload,
      });

    default:
      return state;
  }
};

export { logReducer };
