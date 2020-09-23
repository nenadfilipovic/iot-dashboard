import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
} from '../types/ActionTypes';
import { AppThunk } from '../types/StateTypes';
import { User } from '../types';
import { _logUserIn, _logUserOut } from '../services/authService';

const logUserIn = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  await _logUserIn(formData)
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

const logUserOut = (): AppThunk => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT_REQUEST,
  });
  await _logUserOut();
};

export { logUserIn, logUserOut };
