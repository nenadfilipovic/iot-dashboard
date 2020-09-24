import {
  Device,
  AppThunk,
  REGISTER_DEVICE_SUCCESS,
  MODIFY_DEVICE_SUCCESS,
  REMOVE_DEVICE_SUCCESS,
  GET_SINGLE_DEVICE_SUCCESS,
  GET_ALL_DEVICES_SUCCESS,
  ACTION_STARTED,
  ACTION_STOPPED,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
} from '../types';
import {
  _getAllDevices,
  _getSingleDevice,
  _modifyDevice,
  _registerDevice,
  _removeDevice,
} from '../services/device';

const registerDevice = (formData: Device): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _registerDevice(formData)
    .then((response) => {
      dispatch({
        type: REGISTER_DEVICE_SUCCESS,
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

const modifyDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
  formData: Device,
): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _modifyDevice(deviceUniqueIndentifier, formData)
    .then((response) => {
      dispatch({
        type: MODIFY_DEVICE_SUCCESS,
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

const removeDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _removeDevice(deviceUniqueIndentifier)
    .then((response) => {
      dispatch({
        type: REMOVE_DEVICE_SUCCESS,
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

const getSingleDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _getSingleDevice(deviceUniqueIndentifier)
    .then((response) => {
      dispatch({
        type: GET_SINGLE_DEVICE_SUCCESS,
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

const getAllDevices = (): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _getAllDevices()
    .then((response) => {
      dispatch({
        type: GET_ALL_DEVICES_SUCCESS,
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

export {
  getAllDevices,
  getSingleDevice,
  registerDevice,
  modifyDevice,
  removeDevice,
};
