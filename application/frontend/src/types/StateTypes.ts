import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { rootReducer } from '../reducers';
import { User, Device } from './';

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface UserState {
  user: User | null;
}

export interface AuthState {
  isLoggedIn: boolean;
}

export interface NotificationState {
  notificationMessage: string;
}

export interface SystemState {
  isLoading: boolean;
}

export interface DeviceState {
  device: Device | null;
  devices: Device[];
}
