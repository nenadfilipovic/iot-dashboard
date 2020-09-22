import {
  UserAuthActionTypes,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
} from '../types/ActionTypes';
import { AuthState } from '../types/StateTypes';

const initialState: AuthState = {
  isLoggedIn: false,
  isLoggingIn: false,
};
const authReducer = (
  state: AuthState = initialState,
  action: UserAuthActionTypes,
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
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
