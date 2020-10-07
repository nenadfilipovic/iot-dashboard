import { SystemActionTypes, ACTION_STARTED, ACTION_ENDED } from '../types';

const actionStart = (): SystemActionTypes => {
  return {
    type: ACTION_STARTED,
  };
};

const actionStop = (): SystemActionTypes => {
  return {
    type: ACTION_ENDED,
  };
};

export { actionStart, actionStop };
