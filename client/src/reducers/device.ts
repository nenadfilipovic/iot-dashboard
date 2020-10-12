import { mapKeys, omit } from 'lodash';

import {
  DeviceState,
  DeviceActionTypes,
  REGISTER_DEVICE_SUCCESS,
  MODIFY_DEVICE_SUCCESS,
  GET_ALL_DEVICES_SUCCESS,
  REMOVE_DEVICE_SUCCESS,
} from '../types';

const initialState: DeviceState = {
  devices: {},
};
const deviceReducer = (
  state = initialState,
  action: DeviceActionTypes,
): DeviceState => {
  switch (action.type) {
    case REGISTER_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        devices: { ...state.devices, [action.payload.channel]: action.payload },
      });

    case MODIFY_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        devices: { [action.payload.channel]: action.payload },
      });

    case REMOVE_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        devices: omit(state.devices, action.payload),
      });

    case GET_ALL_DEVICES_SUCCESS:
      return Object.assign({}, state, {
        devices: mapKeys(action.payload, 'channel'),
      });

    default:
      return state;
  }
};

export { deviceReducer };
