import { combineReducers } from 'redux';

import { notificationReducer } from './notification';
import { systemReducer } from './system';
import { deviceReducer } from './device';
import { userReducer } from './user';

const rootReducer = combineReducers({
  notificationReducer,
  systemReducer,
  deviceReducer,
  userReducer,
});

export { rootReducer };
