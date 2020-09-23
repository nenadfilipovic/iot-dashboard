import {
  SystemActionTypes,
  ACTION_START,
  ACTION_STOP,
} from '../types/ActionTypes';

const actionStart = (): SystemActionTypes => {
  return {
    type: ACTION_START,
  };
};

const actionStop = (): SystemActionTypes => {
  return {
    type: ACTION_STOP,
  };
};

export { actionStart, actionStop };
