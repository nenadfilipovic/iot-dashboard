import {
  AppThunk,
  UserAttributes,
  GET_USER_SUCCESS,
  MODIFY_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  ACTION_STARTED,
  ACTION_ENDED,
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

const registerUser = (formData: UserAttributes): AppThunk => async (
  dispatch,
) => {
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
        type: LOGIN_USER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
      });
    });
  dispatch({
    type: ACTION_ENDED,
  });
};

const modifyUser = (formData: UserAttributes): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _modifyUser(formData)
    .then((response) => {
      dispatch({
        type: MODIFY_USER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
      });
    });
  dispatch({
    type: ACTION_ENDED,
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
      });
    });
  dispatch({
    type: ACTION_ENDED,
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
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
      });
    });
  dispatch({
    type: ACTION_ENDED,
  });
};

const logUserIn = (formData: UserAttributes): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _logUserIn(formData)
    .then((response) => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: error.response.data,
      });
    });
  dispatch({
    type: ACTION_ENDED,
  });
};

const logUserOut = (): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _logUserOut()
    .then(() => {})
    .catch((error) => {
      dispatch({
        type: NOTIFICATION_FAILURE,
      });
    });
  dispatch({
    type: ACTION_ENDED,
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
