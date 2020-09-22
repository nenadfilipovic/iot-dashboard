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

export interface RegisterState {
  isRegistering: boolean;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
}
