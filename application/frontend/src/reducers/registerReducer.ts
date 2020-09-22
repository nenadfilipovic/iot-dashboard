import {
  UserRegisterActionTypes,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from '../types/ActionTypes';
import { RegisterState } from '../types/StateTypes';

const initialState: RegisterState = {
  isRegistering: false,
};
const registerReducer = (
  state: RegisterState = initialState,
  action: UserRegisterActionTypes,
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        isRegistering: false,
      };
    default:
      return state;
  }
};

export { registerReducer };
