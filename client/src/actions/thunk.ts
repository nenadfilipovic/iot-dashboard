import { AppThunk, UserAttributes } from '../types';
import { actionStart, actionStop } from './system';
import { setAlert } from './alert';
import {
  _registerUser,
  _modifyUser,
  _removeUser,
  _getCurrentUser,
  _logUserIn,
  _logUserOut,
} from '../services/user';
import { logUserIn, logUserOut, modifyUser } from './user';
import { AxiosError } from 'axios';

const thunkLogUserOut = (): AppThunk => async (dispatch) => {
  dispatch(actionStart());
  await _logUserOut()
    .then((response) => {
      dispatch(logUserOut());
    })
    .catch((error: AxiosError) => {
      const { status, message } = error.response?.data;
      dispatch(setAlert({ status, message }));
    });
  dispatch(actionStop());
};

const thunkLogUserIn = (formData: UserAttributes): AppThunk => async (
  dispatch,
) => {
  dispatch(actionStart());
  await _logUserIn(formData)
    .then((response) => {
      const { status, message, data } = response.data;
      dispatch(logUserIn(data));
      dispatch(setAlert({ status, message }));
    })
    .catch((error: AxiosError) => {
      const { status, message } = error.response?.data;
      dispatch(setAlert({ status, message }));
    });
  dispatch(actionStop());
};

const thunkGetCurrentUser = (): AppThunk => async (dispatch) => {
  dispatch(actionStart());
  await _getCurrentUser()
    .then((response) => {
      //dispatch(getCurrentUser());
    })
    .catch((error) => {
      //dispatch(notificationMessage()); // Izvaditi status i message iz erora
    });
  dispatch(actionStop());
};

const thunkRemoveUser = (): AppThunk => async (dispatch) => {
  dispatch(actionStart());
  await _removeUser()
    .then(() => {
      dispatch(logUserOut());
    })
    .catch((error) => {
      const { status, message } = error.response?.data;
      dispatch(setAlert({ status, message }));
    });
  dispatch(actionStop());
};

const thunkModifyUser = (formData: UserAttributes): AppThunk => async (
  dispatch,
) => {
  dispatch(actionStart());
  await _modifyUser(formData)
    .then((response) => {
      const { status, message, data } = response.data;
      dispatch(modifyUser(data));
      dispatch(setAlert({ status, message }));
    })
    .catch((error: AxiosError) => {
      const { status, message } = error.response?.data;
      dispatch(setAlert({ status, message }));
    });
  dispatch(actionStop());
};

const thunkRegisterUser = (formData: UserAttributes): AppThunk => async (
  dispatch,
) => {
  dispatch(actionStart());
  await _registerUser(formData)
    .then((response) => {
      /**
       * After user is created,
       * log him in immediately
       */
      const { status, message, data } = response.data;
      dispatch(logUserIn(data));
      dispatch(setAlert({ status, message }));
    })
    .catch((error: AxiosError) => {
      const { status, message } = error.response?.data;
      dispatch(setAlert({ status, message }));
    });
  dispatch(actionStop());
};

export {
  thunkGetCurrentUser,
  thunkRemoveUser,
  thunkRegisterUser,
  thunkModifyUser,
  thunkLogUserOut,
  thunkLogUserIn,
};
