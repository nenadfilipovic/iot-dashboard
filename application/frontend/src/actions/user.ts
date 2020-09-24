import {
  AppThunk,
  User,
  REGISTER_USER_SUCCESS,
  GET_USER_SUCCESS,
  MODIFY_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  ACTION_STARTED,
  ACTION_STOPPED,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  LOGOUT_USER_SUCCESS,
} from '../types';
import {
  _registerUser,
  _modifyUser,
  _removeUser,
  _getCurrentUser,
  _logUserIn,
  _logUserOut,
} from '../services/user';

const registerUser = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _registerUser(formData)
    .then((response) => {
      /**
       * After user is created,
       * log him in immediately
       */
      dispatch({
        type: REGISTER_USER_SUCCESS,
      });
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: error,
      });
    });
  dispatch({
    type: ACTION_STOPPED,
  });
};

const modifyUser = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _modifyUser(formData)
    .then((response) => {
      dispatch({
        type: MODIFY_USER_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: error,
      });
    });
  dispatch({
    type: ACTION_STOPPED,
  });
};

const removeUser = (): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _removeUser()
    .then(() => {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: error,
      });
    });
  dispatch({
    type: ACTION_STOPPED,
  });
};

const getCurrentUser = (): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _getCurrentUser()
    .then((response) => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: error,
      });
    });
  dispatch({
    type: ACTION_STOPPED,
  });
};

const logUserIn = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _logUserIn(formData)
    .then((response) => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: error,
      });
    });
  dispatch({
    type: ACTION_STOPPED,
  });
};

const logUserOut = (): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _logUserOut()
    .then(() => {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: error,
      });
    });
  dispatch({
    type: ACTION_STOPPED,
  });
};

export {
  registerUser,
  modifyUser,
  removeUser,
  getCurrentUser,
  logUserIn,
  logUserOut,
};
