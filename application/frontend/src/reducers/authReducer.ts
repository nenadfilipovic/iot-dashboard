import {
  AuthActionTypes,
  AuthState,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from '../store/reduxTypes';

const initialState: AuthState = {
  isLoggedIn: false,
  loggedInUser: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: null,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggedInUser: action.payload,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: null,
      };
    default:
      return state;
  }
};

export { authReducer };
