import { Device } from '../types';
import {
  REGISTER_DEVICE_REQUEST,
  REGISTER_DEVICE_SUCCESS,
  REGISTER_DEVICE_FAILURE,
  MODIFY_DEVICE_REQUEST,
  MODIFY_DEVICE_SUCCESS,
  MODIFY_DEVICE_FAILURE,
  REMOVE_DEVICE_REQUEST,
  REMOVE_DEVICE_SUCCESS,
  REMOVE_DEVICE_FAILURE,
  GET_SINGLE_DEVICE_REQUEST,
  GET_SINGLE_DEVICE_SUCCESS,
  GET_SINGLE_DEVICE_FAILURE,
  GET_ALL_DEVICES_REQUEST,
  GET_ALL_DEVICES_SUCCESS,
  GET_ALL_DEVICES_FAILURE,
} from '../types/ActionTypes';
import { AppThunk } from '../types/StateTypes';
import {
  _getAllDevices,
  _getSingleDevice,
  _modifyDevice,
  _registerDevice,
  _removeDevice,
} from '../services/deviceService';

const registerDevice = (formData: Device): AppThunk => async (dispatch) => {
  dispatch({
    type: REGISTER_DEVICE_REQUEST,
  });
  await _registerDevice(formData)
    .then(() => {
      dispatch({
        type: REGISTER_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: REGISTER_DEVICE_FAILURE,
        error,
      });
    });
};

const modifyDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
  formData: Device,
): AppThunk => async (dispatch) => {
  dispatch({
    type: MODIFY_DEVICE_REQUEST,
  });
  await _modifyDevice(deviceUniqueIndentifier, formData)
    .then(() => {
      dispatch({
        type: MODIFY_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: MODIFY_DEVICE_FAILURE,
        error,
      });
    });
};

const removeDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
): AppThunk => async (dispatch) => {
  dispatch({
    type: REMOVE_DEVICE_REQUEST,
  });
  await _removeDevice(deviceUniqueIndentifier)
    .then(() => {
      dispatch({
        type: REMOVE_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: REMOVE_DEVICE_FAILURE,
        error,
      });
    });
};

const getSingleDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
): AppThunk => async (dispatch) => {
  dispatch({
    type: GET_SINGLE_DEVICE_REQUEST,
  });
  await _getSingleDevice(deviceUniqueIndentifier)
    .then(() => {
      dispatch({
        type: GET_SINGLE_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_SINGLE_DEVICE_FAILURE,
        error,
      });
    });
};

const getAllDevices = (): AppThunk => async (dispatch) => {
  dispatch({
    type: GET_ALL_DEVICES_REQUEST,
  });
  await _getAllDevices()
    .then(() => {
      dispatch({
        type: GET_ALL_DEVICES_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_DEVICES_FAILURE,
        error,
      });
    });
};

export {
  getAllDevices,
  getSingleDevice,
  registerDevice,
  modifyDevice,
  removeDevice,
};
