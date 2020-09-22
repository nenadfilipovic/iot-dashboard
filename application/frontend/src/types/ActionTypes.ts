import { User } from '../types';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';

interface UserRegisterRequest {
  type: typeof USER_REGISTER_REQUEST;
}

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

interface UserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
}

export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

interface UserRegisterFailure {
  type: typeof USER_REGISTER_FAILURE;
}

export type UserRegisterActionTypes =
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFailure;

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';

interface UserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

interface UserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: User;
}

export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

interface UserLoginFailure {
  type: typeof USER_LOGIN_FAILURE;
}

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';

interface UserLogoutRequest {
  type: typeof USER_LOGOUT_REQUEST;
}

export type UserAuthActionTypes =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFailure
  | UserLogoutRequest;
