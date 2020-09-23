import {
  UserActionTypes,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  MODIFY_USER_REQUEST,
  MODIFY_USER_SUCCESS,
  MODIFY_USER_FAILURE,
  REMOVE_USER_REQUEST,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
} from '../types/ActionTypes';
import { UserState } from '../types/StateTypes';

const initialState: UserState = {
  user: null,
};
const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes,
) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
      };
    case MODIFY_USER_REQUEST:
      return {
        ...state,
      };
    case MODIFY_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case MODIFY_USER_FAILURE:
      return {
        ...state,
      };
    case REMOVE_USER_REQUEST:
      return {
        ...state,
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        user: null,
      };
    case REMOVE_USER_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export { userReducer };
