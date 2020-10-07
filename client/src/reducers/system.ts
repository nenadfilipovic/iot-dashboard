import {
  SystemState,
  SystemActionTypes,
  ACTION_STARTED,
  ACTION_ENDED,
} from '../types';

const initialState: SystemState = {
  isLoading: false,
};
const systemReducer = (
  state = initialState,
  action: SystemActionTypes,
): SystemState => {
  switch (action.type) {
    case ACTION_STARTED:
      return {
        ...state,
        isLoading: true,
      };

    case ACTION_ENDED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export { systemReducer };
