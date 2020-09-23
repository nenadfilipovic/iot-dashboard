import {
  SystemActionTypes,
  ACTION_START,
  ACTION_STOP,
} from '../types/ActionTypes';
import { SystemState } from '../types/StateTypes';

const initialState: SystemState = {
  isLoading: false,
};
const systemReducer = (
  state: SystemState = initialState,
  action: SystemActionTypes,
) => {
  switch (action.type) {
    case ACTION_START:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_STOP:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export { systemReducer };
