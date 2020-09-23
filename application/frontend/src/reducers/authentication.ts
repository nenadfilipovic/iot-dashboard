import {
  AuthActionTypes,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
} from '../types/ActionTypes';
import { AuthState } from '../types/StateTypes';

const initialState: AuthState = {
  isLoggedIn: false,
};
const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes,
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export { authReducer };
