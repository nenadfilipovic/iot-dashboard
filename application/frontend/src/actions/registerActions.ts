import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../types/ActionTypes';
import { AppThunk } from '../types/StateTypes';
import { User } from '../types';
import { register } from '../services/authService';

const userRegister = (formData: User): AppThunk => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });
  await register(formData)
    .then(() => {
      dispatch({
        type: USER_REGISTER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_REGISTER_FAILURE,
        error,
      });
    });
};

export { userRegister };
