import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { registerReducer } from './registerReducer';

const rootReducer = combineReducers({ authReducer, registerReducer });

export { rootReducer };
