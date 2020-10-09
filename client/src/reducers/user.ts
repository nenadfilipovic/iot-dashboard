import {
  UserState,
  UserActionTypes,
  GET_USER_SUCCESS,
  MODIFY_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
} from '../types';

const initialState: UserState = {
  user: null,
};
const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
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
