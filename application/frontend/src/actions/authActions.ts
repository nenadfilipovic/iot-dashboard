import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
} from '../types/ActionTypes';
import { AppThunk } from '../types/StateTypes';
import { User } from '../types';
import { login, logout } from '../services/authService';

const userLogin = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  await login(formData)
    .then((response) => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        response,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_LOGIN_FAILURE,
        error,
      });
    });
};

const userLogout = (): AppThunk => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT_REQUEST,
  });
  await logout();
};

export { userLogin, userLogout };
