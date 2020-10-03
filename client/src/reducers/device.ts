import {
  DeviceState,
  DeviceActionTypes,
  REGISTER_DEVICE_SUCCESS,
  MODIFY_DEVICE_SUCCESS,
  GET_ALL_DEVICES_SUCCESS,
  GET_SINGLE_DEVICE_SUCCESS,
  REMOVE_DEVICE_SUCCESS,
} from '../types';

const initialState: DeviceState = {
  devices: [],
};
const deviceReducer = (
  state = initialState,
  action: DeviceActionTypes,
): DeviceState => {
  switch (action.type) {
    case REGISTER_DEVICE_SUCCESS:
      return {
        ...state,
      };

    case MODIFY_DEVICE_SUCCESS:
      return {
        ...state,
      };

    case REMOVE_DEVICE_SUCCESS:
      return {
        ...state,
      };

    case GET_SINGLE_DEVICE_SUCCESS:
      return {
        ...state,
      };

    case GET_ALL_DEVICES_SUCCESS:
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };

    default:
      return state;
  }
};

export { deviceReducer };
