import {
  DeviceAttributes,
  AppThunk,
  REGISTER_DEVICE_SUCCESS,
  MODIFY_DEVICE_SUCCESS,
  REMOVE_DEVICE_SUCCESS,
  GET_SINGLE_DEVICE_SUCCESS,
  GET_ALL_DEVICES_SUCCESS,
  ACTION_STARTED,
  ACTION_ENDED,
  SET_ALERT,
} from '../types';
import {
  _getAllDevices,
  _getSingleDevice,
  _modifyDevice,
  _registerDevice,
  _removeDevice,
} from '../services/device';

const registerDevice = (formData: DeviceAttributes): AppThunk => async (
  dispatch,
) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _registerDevice(formData)
    .then((response) => {
      dispatch({
        type: REGISTER_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT,
      });
    });
  dispatch({
    type: ACTION_ENDED,
  });
};

const modifyDevice = (
  id: DeviceAttributes['id'],
  formData: DeviceAttributes,
): AppThunk => async (dispatch) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _modifyDevice(id, formData)
    .then((response) => {
      dispatch({
        type: MODIFY_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT,
      });
    });
  dispatch({
    type: ACTION_ENDED,
  });
};

const removeDevice = (id: DeviceAttributes['id']): AppThunk => async (
  dispatch,
) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _removeDevice(id)
    .then((response) => {
      dispatch({
        type: REMOVE_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT,
      });
    });
  dispatch({
    type: ACTION_ENDED,
  });
};

const getSingleDevice = (id: DeviceAttributes['id']): AppThunk => async (
  dispatch,
) => {
  dispatch({
    type: ACTION_STARTED,
  });
  await _getSingleDevice(id)
    .then((response) => {
      dispatch({
        type: GET_SINGLE_DEVICE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT,
      });
    });
  dispatch({
    type: ACTION_ENDED,
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
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT,
      });
    });
  dispatch({
    type: ACTION_ENDED,
  });
};

export {
  getAllDevices,
  getSingleDevice,
  registerDevice,
  modifyDevice,
  removeDevice,
};
