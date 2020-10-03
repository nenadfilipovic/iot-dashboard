import { SystemActionTypes, ACTION_STARTED, ACTION_STOPPED } from '../types';

const actionStart = (): SystemActionTypes => {
  return {
    type: ACTION_STARTED,
  };
};

const actionStop = (): SystemActionTypes => {
  return {
    type: ACTION_STOPPED,
  };
};

export { actionStart, actionStop };
