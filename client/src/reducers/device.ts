import { mapKeys, omit } from 'lodash';

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
  devices: {},
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
      return Object.assign({}, state, {
        devices: { [action.payload.channel]: action.payload },
      });

    case REMOVE_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        devices: omit(state, action.payload.channel),
      });

    case GET_SINGLE_DEVICE_SUCCESS:
      return {
        ...state,
      };

    case GET_ALL_DEVICES_SUCCESS: //fetch
      return Object.assign({}, state, {
        devices: mapKeys(action.payload, 'channel'),
      });

    default:
      return state;
  }
};

export { deviceReducer };
