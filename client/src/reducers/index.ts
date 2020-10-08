import { combineReducers } from 'redux';

import { alertReducer } from './alert';
import { systemReducer } from './system';
import { deviceReducer } from './device';
import { userReducer } from './user';

const rootReducer = combineReducers({
  alertReducer,
  systemReducer,
  deviceReducer,
  userReducer,
});

export { rootReducer };
