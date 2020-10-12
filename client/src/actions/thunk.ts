import { AppThunk, UserAttributes, DeviceAttributes } from '../types';
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
import { _getLogs } from '../services/log';
import {
  _getAllDevices,
  _getSingleDevice,
  _modifyDevice,
  _registerDevice,
  _removeDevice,
} from '../services/device';
import { logUserIn, logUserOut, modifyUser } from './user';
import { getLogs } from './log';
import {
  getAllDevices,
  removeDevice,
  modifyDevice,
  registerDevice,
} from './device';
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
    .catch((error: AxiosError) => {});
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

const thunkGetAllDevices = (): AppThunk => async (dispatch) => {
  dispatch(actionStart());
  await _getAllDevices()
    .then((response) => {
      const { data } = response.data;
      dispatch(getAllDevices(data));
    })
    .catch((error: AxiosError) => {
      // const { status, message } = error.response?.data;
      // dispatch(setAlert({ status, message }));
    });
  dispatch(actionStop());
};

const thunkRemoveDevice = (id: string): AppThunk => async (dispatch) => {
  dispatch(actionStart());
  await _removeDevice(id)
    .then((response) => {
      const { status, message, data } = response.data;
      dispatch(removeDevice(id));
      dispatch(setAlert({ status, message }));
    })
    .catch((error) => {});
  dispatch(actionStop());
};

const thunkModifyDevice = (
  id: string,
  formData: DeviceAttributes,
): AppThunk => async (dispatch) => {
  dispatch(actionStart());
  await _modifyDevice(id, formData)
    .then((response) => {
      const { status, message, data } = response.data;
      dispatch(modifyDevice(data));
    })
    .catch((error) => {
      const { status, message } = error.response?.data;
      dispatch(setAlert({ status, message }));
    });
  dispatch(actionStop());
};

const thunkRegisterDevice = (formData: DeviceAttributes): AppThunk => async (
  dispatch,
) => {
  dispatch(actionStart());
  await _registerDevice(formData)
    .then((response) => {
      const { status, message, data } = response.data;
      dispatch(registerDevice(data));
      dispatch(setAlert({ status, message }));
    })
    .catch((error) => {
      const { status, message } = error.response?.data;
      dispatch(setAlert({ status, message }));
    });
  dispatch(actionStop());
};

const thunkGetLogs = (deviceId: string): AppThunk => async (dispatch) => {
  dispatch(actionStart());
  await _getLogs(deviceId)
    .then((response) => {
      const { data } = response.data;
      dispatch(getLogs(data));
    })
    .catch((error) => {
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
  thunkGetAllDevices,
  thunkRegisterDevice,
  thunkRemoveDevice,
  thunkModifyDevice,
  thunkGetLogs,
};
