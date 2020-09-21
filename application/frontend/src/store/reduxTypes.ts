import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { rootReducer } from '../reducers';

import { User } from '../types';

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';

interface UserRegistrationRequest {
  type: typeof USER_REGISTER_REQUEST;
}

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

interface UserRegistrationSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: User;
}

export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

interface UserRegistrationFailure {
  type: typeof USER_REGISTER_FAILURE;
}

export interface AuthState {
  isLoggedIn: boolean;
  loggedInUser: User | null;
}

export type AuthActionTypes =
  | UserRegistrationRequest
  | UserRegistrationSuccess
  | UserRegistrationFailure;
