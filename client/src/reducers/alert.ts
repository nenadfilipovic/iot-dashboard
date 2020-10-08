import { AlertState, AlertActionTypes, SET_ALERT, CLEAR_ALERT } from '../types';

const initialState: AlertState = {
  status: '',
  message: '',
};
const alertReducer = (
  state = initialState,
  action: AlertActionTypes,
): AlertState => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        ...action.payload,
      };

    case CLEAR_ALERT:
      return {
        ...state,
        status: '',
        message: '',
      };

    default:
      return state;
  }
};

export { alertReducer };
