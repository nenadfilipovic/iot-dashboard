import { combineReducers } from 'redux';

import { alertReducer } from './alert';
import { systemReducer } from './system';
import { deviceReducer } from './device';
import { userReducer } from './user';
import { logReducer } from './log';

const rootReducer = combineReducers({
  alertReducer,
  systemReducer,
  deviceReducer,
  userReducer,
  logReducer,
});

export { rootReducer };
