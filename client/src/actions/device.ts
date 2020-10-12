import {
  DeviceAttributes,
  REGISTER_DEVICE_SUCCESS,
  MODIFY_DEVICE_SUCCESS,
  REMOVE_DEVICE_SUCCESS,
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

const removeDevice = (removeDevice: string): DeviceActionTypes => {
  return {
    type: REMOVE_DEVICE_SUCCESS,
    payload: removeDevice,
  };
};

const getAllDevices = (allDevices: DeviceAttributes): DeviceActionTypes => {
  return {
    type: GET_ALL_DEVICES_SUCCESS,
    payload: allDevices,
  };
};

export { getAllDevices, registerDevice, modifyDevice, removeDevice };
