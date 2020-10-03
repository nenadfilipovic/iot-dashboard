import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { rootReducer } from '../reducers';

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface User {
  userHandle: string;
  userFirstName: string;
  userLastName: string;
  userEmailAddress: string;
  userPassword?: string;
  userLocation?: string;
  userRole?: UserType;
  userLastLoginDate?: string;
  userRegisterDate?: string;
}

export enum UserAttributesCasting {
  userHandle = 'userHandle',
  userFirstName = 'userFirstName',
  userLastName = 'userLastName',
  userEmailAddress = 'userEmailAddress',
  userPassword = 'userPassword',
  userLocation = 'userLocation',
  userRole = 'userRole',
  userLastLoginDate = 'userLastLoginDate',
  userRegisterDate = 'userRegisterDate',
}

type UserType = 'admin' | 'standard';

export interface UserState {
  user: User | null;
}

export interface Device {
  deviceUniqueIndentifier: string;
  deviceName: string;
  deviceChannel: string;
  deviceDescription: string;
  deviceType: DeviceType;
  deviceCreateDate: string;
}

export enum DeviceAttributesCasting {
  deviceUniqueIndentifier = 'deviceUniqueIndentifier',
  deviceName = 'deviceName',
  deviceChannel = 'deviceChannel',
  deviceDescription = 'deviceDescription',
  deviceType = 'deviceType',
  deviceCreateDate = 'deviceCreateDate',
}

export type DeviceType = 'esp32' | 'esp8266';

export interface DeviceState {
  devices: Device[];
}

export interface NotificationState {
  type: string;
  message: string;
}

export interface SystemState {
  isLoading: boolean;
}

export type ReactSVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

interface RegisterUserSuccess {
  type: typeof REGISTER_USER_SUCCESS;
  payload: User;
}

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

interface GetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  payload: User;
}

export const MODIFY_USER_SUCCESS = 'MODIFY_USER_SUCCESS';

interface ModifyUserSuccess {
  type: typeof MODIFY_USER_SUCCESS;
  payload: User;
}

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

interface LogInUserSuccess {
  type: typeof LOGIN_USER_SUCCESS;
  payload: User;
}

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

interface LogOutUserSuccess {
  type: typeof LOGOUT_USER_SUCCESS;
}

export type UserActionTypes =
  | RegisterUserSuccess
  | GetUserSuccess
  | ModifyUserSuccess
  | LogInUserSuccess
  | LogOutUserSuccess;

export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS';

interface NotificationSuccess {
  type: typeof NOTIFICATION_SUCCESS;
  payload: string;
}

export const NOTIFICATION_FAILURE = 'NOTIFICATION_FAILURE';

interface NotificationFailure {
  type: typeof NOTIFICATION_FAILURE;
  payload: string;
}

export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

interface ClearNotifications {
  type: typeof CLEAR_NOTIFICATIONS;
}

export type NotificationActionTypes =
  | NotificationSuccess
  | NotificationFailure
  | ClearNotifications;

export const ACTION_STARTED = 'ACTION_STARTED';

interface ActionStarted {
  type: typeof ACTION_STARTED;
}

export const ACTION_STOPPED = 'ACTION_STOPPED';

interface ActionStopped {
  type: typeof ACTION_STOPPED;
}

export type SystemActionTypes = ActionStarted | ActionStopped;

export const REGISTER_DEVICE_SUCCESS = 'REGISTER_DEVICE_SUCCESS';

interface RegisterDeviceSuccess {
  type: typeof REGISTER_DEVICE_SUCCESS;
}

export const MODIFY_DEVICE_SUCCESS = 'MODIFY_DEVICE_SUCCESS';

interface ModifyDeviceSuccess {
  type: typeof MODIFY_DEVICE_SUCCESS;
  payload: Device;
}

export const REMOVE_DEVICE_SUCCESS = 'REMOVE_DEVICE_SUCCESS';

interface RemoveDeviceSuccess {
  type: typeof REMOVE_DEVICE_SUCCESS;
}

export const GET_SINGLE_DEVICE_SUCCESS = 'GET_SINGLE_DEVICE_SUCCESS';

interface GetSingleDeviceSuccess {
  type: typeof GET_SINGLE_DEVICE_SUCCESS;
  payload: Device;
}

export const GET_ALL_DEVICES_SUCCESS = 'GET_ALL_DEVICES_SUCCESS';

interface GetAllDevicesSuccess {
  type: typeof GET_ALL_DEVICES_SUCCESS;
  payload: Device;
}

export type DeviceActionTypes =
  | RegisterDeviceSuccess
  | ModifyDeviceSuccess
  | RemoveDeviceSuccess
  | GetSingleDeviceSuccess
  | GetAllDevicesSuccess;
