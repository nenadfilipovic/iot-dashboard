import { combineReducers } from 'redux';

import { authReducer } from './authentication';
import { userReducer } from './user';
import { notificationReducer } from './notification';
import { systemReducer } from './system';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  notificationReducer,
  systemReducer,
});

export { rootReducer };
