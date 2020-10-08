import { AlertActionTypes, SET_ALERT, CLEAR_ALERT, AlertState } from '../types';

const setAlert = (newAlert: AlertState): AlertActionTypes => {
  return {
    type: SET_ALERT,
    payload: newAlert,
  };
};

const clearAlert = (): AlertActionTypes => {
  return {
    type: CLEAR_ALERT,
  };
};

export { setAlert, clearAlert };
