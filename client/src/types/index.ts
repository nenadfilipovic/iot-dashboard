import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { rootReducer } from '../reducers';

/**
 * App types
 */

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface NotificationState {
  message: string;
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

export type NotificationActionTypes = NotificationFailure | ClearNotifications;

export interface SystemState {
  isLoading: boolean;
}

export const ACTION_STARTED = 'ACTION_STARTED';

interface ActionStarted {
  type: typeof ACTION_STARTED;
}

export const ACTION_ENDED = 'ACTION_ENDED';

interface ActionStopped {
  type: typeof ACTION_ENDED;
}

export type SystemActionTypes = ActionStarted | ActionStopped;

export type ReactSVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

/**
 * User types
 */

export interface UserAttributes {
  id: string;
  handle: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  role: Role;
  modifyDate: Date;
  registerDate: Date;
}

export enum Role {
  admin = 'admin',
  standard = 'standard',
}

export enum UserTypesCasting {
  handle = 'handle',
  firstName = 'firstName',
  lastName = 'lastName',
  emailAddress = 'emailAddress',
  password = 'password',
  role = 'role',
  modifyDate = 'modifyDate',
  registerDate = 'registerDate',
}

export interface UserState {
  user: UserAttributes | null;
}

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

interface GetUserSuccess {
  type: typeof GET_USER_SUCCESS;
}

export const MODIFY_USER_SUCCESS = 'MODIFY_USER_SUCCESS';

interface ModifyUserSuccess {
  type: typeof MODIFY_USER_SUCCESS;
}

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

interface LogInUserSuccess {
  type: typeof LOGIN_USER_SUCCESS;
  payload: UserAttributes;
}

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

interface LogOutUserSuccess {
  type: typeof LOGOUT_USER_SUCCESS;
}

export type UserActionTypes =
  | GetUserSuccess
  | ModifyUserSuccess
  | LogInUserSuccess
  | LogOutUserSuccess;

/**
 * Device types
 */

export interface DeviceAttributes {
  id: string;
  owner?: string;
  name: string;
  channel: string;
  description: string;
  type: Type;
  modifyDate: Date;
  registerDate: Date;
}

export enum Type {
  esp32 = 'esp32',
  esp8266 = 'esp8266',
}

export enum DeviceTypesCasting {
  id = 'id',
  name = 'name',
  channel = 'channel',
  description = 'description',
  type = 'type',
  modifyDate = 'modifyDate',
  registerDate = 'registerDate',
}

export interface DeviceState {
  devices: DeviceAttributes[];
}

export const REGISTER_DEVICE_SUCCESS = 'REGISTER_DEVICE_SUCCESS';

interface RegisterDeviceSuccess {
  type: typeof REGISTER_DEVICE_SUCCESS;
}

export const MODIFY_DEVICE_SUCCESS = 'MODIFY_DEVICE_SUCCESS';

interface ModifyDeviceSuccess {
  type: typeof MODIFY_DEVICE_SUCCESS;
}

export const REMOVE_DEVICE_SUCCESS = 'REMOVE_DEVICE_SUCCESS';

interface RemoveDeviceSuccess {
  type: typeof REMOVE_DEVICE_SUCCESS;
}

export const GET_SINGLE_DEVICE_SUCCESS = 'GET_SINGLE_DEVICE_SUCCESS';

interface GetSingleDeviceSuccess {
  type: typeof GET_SINGLE_DEVICE_SUCCESS;
}

export const GET_ALL_DEVICES_SUCCESS = 'GET_ALL_DEVICES_SUCCESS';

interface GetAllDevicesSuccess {
  type: typeof GET_ALL_DEVICES_SUCCESS;
}

export type DeviceActionTypes =
  | RegisterDeviceSuccess
  | ModifyDeviceSuccess
  | RemoveDeviceSuccess
  | GetSingleDeviceSuccess
  | GetAllDevicesSuccess;
