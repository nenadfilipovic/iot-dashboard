import {
  DeviceActionTypes,
  REGISTER_DEVICE_REQUEST,
  REGISTER_DEVICE_SUCCESS,
  REGISTER_DEVICE_FAILURE,
  MODIFY_DEVICE_REQUEST,
  MODIFY_DEVICE_SUCCESS,
  MODIFY_DEVICE_FAILURE,
  GET_ALL_DEVICES_FAILURE,
  GET_ALL_DEVICES_SUCCESS,
  GET_ALL_DEVICES_REQUEST,
  GET_SINGLE_DEVICE_FAILURE,
  GET_SINGLE_DEVICE_SUCCESS,
  GET_SINGLE_DEVICE_REQUEST,
  REMOVE_DEVICE_FAILURE,
  REMOVE_DEVICE_SUCCESS,
  REMOVE_DEVICE_REQUEST,
} from '../types/ActionTypes';
import { DeviceState } from '../types/StateTypes';

const initialState: DeviceState = {
  device: null,
  devices: [],
};
const deviceReducer = (
  state: DeviceState = initialState,
  action: DeviceActionTypes,
) => {
  switch (action.type) {
    case REGISTER_DEVICE_REQUEST:
      return {
        ...state,
      };
    case REGISTER_DEVICE_SUCCESS:
      return {
        ...state,
      };
    case REGISTER_DEVICE_FAILURE:
      return {
        ...state,
      };
    case MODIFY_DEVICE_REQUEST:
      return {
        ...state,
      };
    case MODIFY_DEVICE_SUCCESS:
      return {
        ...state,
      };
    case MODIFY_DEVICE_FAILURE:
      return {
        ...state,
      };
    case REMOVE_DEVICE_REQUEST:
      return {
        ...state,
      };
    case REMOVE_DEVICE_SUCCESS:
      return {
        ...state,
      };
    case REMOVE_DEVICE_FAILURE:
      return {
        ...state,
      };
    case GET_SINGLE_DEVICE_REQUEST:
      return {
        ...state,
      };
    case GET_SINGLE_DEVICE_SUCCESS:
      return {
        ...state,
      };
    case GET_SINGLE_DEVICE_FAILURE:
      return {
        ...state,
      };
    case GET_ALL_DEVICES_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_DEVICES_SUCCESS:
      return {
        ...state,
      };
    case GET_ALL_DEVICES_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export { deviceReducer };
