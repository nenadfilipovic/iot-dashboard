import { NotificationState, UserState } from './StateTypes';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';

interface RegisterUserRequest {
  type: typeof REGISTER_USER_REQUEST;
}

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

interface RegisterUserSuccess {
  type: typeof REGISTER_USER_SUCCESS;
  payload: UserState;
}

export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

interface RegisterUserFailure {
  type: typeof REGISTER_USER_FAILURE;
}

export const GET_USER_REQUEST = 'GET_USER_REQUEST';

interface GetUserRequest {
  type: typeof GET_USER_REQUEST;
}

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

interface GetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  payload: UserState;
}

export const GET_USER_FAILURE = 'GET_USER_FAILURE';

interface GetUserFailure {
  type: typeof GET_USER_FAILURE;
}

export const MODIFY_USER_REQUEST = 'MODIFY_USER_REQUEST';

interface ModifyUserRequest {
  type: typeof MODIFY_USER_REQUEST;
}

export const MODIFY_USER_SUCCESS = 'MODIFY_USER_SUCCESS';

interface ModifyUserSuccess {
  type: typeof MODIFY_USER_SUCCESS;
  payload: UserState;
}

export const MODIFY_USER_FAILURE = 'MODIFY_USER_FAILURE';

interface ModifyUserFailure {
  type: typeof MODIFY_USER_FAILURE;
}

export const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';

interface RemoveUserRequest {
  type: typeof REMOVE_USER_REQUEST;
}

export const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';

interface RemoveUserSuccess {
  type: typeof REMOVE_USER_SUCCESS;
}

export const REMOVE_USER_FAILURE = 'REMOVE_USER_FAILURE';

interface RemoveUserFailure {
  type: typeof REMOVE_USER_FAILURE;
}

export type UserActionTypes =
  | RegisterUserRequest
  | RegisterUserSuccess
  | RegisterUserFailure
  | GetUserRequest
  | GetUserSuccess
  | GetUserFailure
  | ModifyUserRequest
  | ModifyUserSuccess
  | ModifyUserFailure
  | RemoveUserRequest
  | RemoveUserSuccess
  | RemoveUserFailure;

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';

interface UserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

interface UserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
}

export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

interface UserLoginFailure {
  type: typeof USER_LOGIN_FAILURE;
}

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';

interface UserLogoutRequest {
  type: typeof USER_LOGOUT_REQUEST;
}

export type AuthActionTypes =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFailure
  | UserLogoutRequest;

export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS';

interface NotificationSuccess {
  type: typeof NOTIFICATION_SUCCESS;
  payload: NotificationState;
}

export const NOTIFICATION_FAILURE = 'NOTIFICATION_FAILURE';

interface NotificationFailure {
  type: typeof NOTIFICATION_FAILURE;
  payload: NotificationState;
}

export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

interface ClearNotifications {
  type: typeof CLEAR_NOTIFICATIONS;
}

export type NotificationActionTypes =
  | NotificationSuccess
  | NotificationFailure
  | ClearNotifications;

export const ACTION_START = 'ACTION_START';

interface ActionStart {
  type: typeof ACTION_START;
}

export const ACTION_STOP = 'ACTION_STOP';

interface ActionStop {
  type: typeof ACTION_STOP;
}

export type SystemActionTypes = ActionStart | ActionStop;

export const REGISTER_DEVICE_REQUEST = 'REGISTER_DEVICE_REQUEST';

interface RegisterDeviceRequest {
  type: typeof REGISTER_DEVICE_REQUEST;
}

export const REGISTER_DEVICE_SUCCESS = 'REGISTER_DEVICE_SUCCESS';

interface RegisterDeviceSuccess {
  type: typeof REGISTER_DEVICE_SUCCESS;
}

export const REGISTER_DEVICE_FAILURE = 'REGISTER_DEVICE_FAILURE';

interface RegisterDeviceFailure {
  type: typeof REGISTER_DEVICE_FAILURE;
}

export const MODIFY_DEVICE_REQUEST = 'MODIFY_DEVICE_REQUEST';

interface ModifyDeviceRequest {
  type: typeof MODIFY_DEVICE_REQUEST;
}

export const MODIFY_DEVICE_SUCCESS = 'MODIFY_DEVICE_SUCCESS';

interface ModifyDeviceSuccess {
  type: typeof MODIFY_DEVICE_SUCCESS;
}

export const MODIFY_DEVICE_FAILURE = 'MODIFY_DEVICE_FAILURE';

interface ModifyDeviceFailure {
  type: typeof MODIFY_DEVICE_FAILURE;
}

export const REMOVE_DEVICE_REQUEST = 'REMOVE_DEVICE_REQUEST';

interface RemoveDeviceRequest {
  type: typeof REMOVE_DEVICE_REQUEST;
}

export const REMOVE_DEVICE_SUCCESS = 'REMOVE_DEVICE_SUCCESS';

interface RemoveDeviceSuccess {
  type: typeof REMOVE_DEVICE_SUCCESS;
}

export const REMOVE_DEVICE_FAILURE = 'REMOVE_DEVICE_FAILURE';

interface RemoveDeviceFailure {
  type: typeof REMOVE_DEVICE_FAILURE;
}

export const GET_SINGLE_DEVICE_REQUEST = 'GET_SINGLE_DEVICE_REQUEST';

interface GetSingleDeviceRequest {
  type: typeof GET_SINGLE_DEVICE_REQUEST;
}

export const GET_SINGLE_DEVICE_SUCCESS = 'GET_SINGLE_DEVICE_SUCCESS';

interface GetSingleDeviceSuccess {
  type: typeof GET_SINGLE_DEVICE_SUCCESS;
}

export const GET_SINGLE_DEVICE_FAILURE = 'GET_SINGLE_DEVICE_FAILURE';

interface GetSingleDeviceFailure {
  type: typeof GET_SINGLE_DEVICE_FAILURE;
}

export const GET_ALL_DEVICES_REQUEST = 'GET_ALL_DEVICES_REQUEST';

interface GetAllDevicesRequest {
  type: typeof GET_ALL_DEVICES_REQUEST;
}

export const GET_ALL_DEVICES_SUCCESS = 'GET_ALL_DEVICES_SUCCESS';

interface GetAllDevicesSuccess {
  type: typeof GET_ALL_DEVICES_SUCCESS;
}

export const GET_ALL_DEVICES_FAILURE = 'GET_ALL_DEVICES_FAILURE';

interface GetAllDevicesFailure {
  type: typeof GET_ALL_DEVICES_FAILURE;
}

export type DeviceActionTypes =
  | RegisterDeviceRequest
  | RegisterDeviceSuccess
  | RegisterDeviceFailure
  | ModifyDeviceRequest
  | ModifyDeviceSuccess
  | ModifyDeviceFailure
  | RemoveDeviceRequest
  | RemoveDeviceSuccess
  | RemoveDeviceFailure
  | GetSingleDeviceRequest
  | GetSingleDeviceSuccess
  | GetSingleDeviceFailure
  | GetAllDevicesRequest
  | GetAllDevicesSuccess
  | GetAllDevicesFailure;
