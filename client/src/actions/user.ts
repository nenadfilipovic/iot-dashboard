import {
  GET_USER_SUCCESS,
  MODIFY_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  UserActionTypes,
  UserAttributes,
} from '../types';

const modifyUser = (modifiedUser: UserAttributes): UserActionTypes => {
  return {
    type: MODIFY_USER_SUCCESS,
    payload: modifiedUser,
  };
};

const getCurrentUser = (fetchedUser: UserAttributes): UserActionTypes => {
  return {
    type: GET_USER_SUCCESS,
  };
};

const logUserIn = (loggedInUser: UserAttributes): UserActionTypes => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: loggedInUser,
  };
};

const logUserOut = (): UserActionTypes => {
  return {
    type: LOGOUT_USER_SUCCESS,
  };
};

export { modifyUser, getCurrentUser, logUserIn, logUserOut };
