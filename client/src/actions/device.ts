import {
  DeviceAttributes,
  REGISTER_DEVICE_SUCCESS,
  MODIFY_DEVICE_SUCCESS,
  REMOVE_DEVICE_SUCCESS,
  GET_SINGLE_DEVICE_SUCCESS,
  GET_ALL_DEVICES_SUCCESS,
  DeviceActionTypes,
} from '../types';

const registerDevice = (
  registeredDevice: DeviceAttributes,
): DeviceActionTypes => {
  return {
    type: REGISTER_DEVICE_SUCCESS,
    payload: registeredDevice,
  };
};

const modifyDevice = (modifiedDevice: DeviceAttributes): DeviceActionTypes => {
  return {
    type: MODIFY_DEVICE_SUCCESS,
    payload: modifiedDevice,
  };
};

const removeDevice = (removeDevice: DeviceAttributes): DeviceActionTypes => {
  return {
    type: REMOVE_DEVICE_SUCCESS,
    payload: removeDevice,
  };
};

const getSingleDevice = (singleDevice: DeviceAttributes): DeviceActionTypes => {
  return {
    type: GET_SINGLE_DEVICE_SUCCESS,
    payload: singleDevice,
  };
};

const getAllDevices = (allDevices: DeviceAttributes): DeviceActionTypes => {
  return {
    type: GET_ALL_DEVICES_SUCCESS,
    payload: allDevices,
  };
};

export {
  getAllDevices,
  getSingleDevice,
  registerDevice,
  modifyDevice,
  removeDevice,
};
