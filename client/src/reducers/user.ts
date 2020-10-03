import {
  UserState,
  UserActionTypes,
  REGISTER_USER_SUCCESS,
  GET_USER_SUCCESS,
  MODIFY_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
} from '../types';

const initialState: UserState = {
  user: null,
};
const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case MODIFY_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export { userReducer };
