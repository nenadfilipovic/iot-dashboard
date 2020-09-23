import {
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
  USER_LOGIN_SUCCESS,
} from '../types/ActionTypes';
import { AppThunk } from '../types/StateTypes';
import { User } from '../types';
import {
  _registerUser,
  _modifyUser,
  _removeUser,
  _getCurrentUser,
} from '../services/userService';

const registerUser = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: REGISTER_USER_REQUEST,
  });
  await _registerUser(formData)
    .then((response) => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: REGISTER_USER_FAILURE,
        error,
      });
    });
};

const modifyUser = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: MODIFY_USER_REQUEST,
  });
  await _modifyUser(formData)
    .then((response) => {
      dispatch({
        type: MODIFY_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: MODIFY_USER_FAILURE,
        error,
      });
    });
};

const removeUser = (): AppThunk => async (dispatch) => {
  dispatch({
    type: REMOVE_USER_REQUEST,
  });
  await _removeUser()
    .then(() => {
      dispatch({
        type: REMOVE_USER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: REMOVE_USER_FAILURE,
        error,
      });
    });
};

const getCurrentUser = (): AppThunk => async (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  await _getCurrentUser()
    .then((response) => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_USER_FAILURE,
        error,
      });
    });
};

export { registerUser, modifyUser, removeUser, getCurrentUser };
