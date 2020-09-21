import {
  AppThunk,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../store/reduxTypes';
import { User } from '../types';
import { register } from '../services/authService';

const userRegister = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: formData,
  });
  await register(formData)
    .then((response) => {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_REGISTER_FAILURE,
      });
    });
};

export { userRegister };
