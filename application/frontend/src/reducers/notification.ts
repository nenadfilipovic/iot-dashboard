import {
  NotificationActionTypes,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  CLEAR_NOTIFICATIONS,
} from '../types/ActionTypes';
import { NotificationState } from '../types/StateTypes';

const initialState: NotificationState = {
  notificationMessage: '',
};
const notificationReducer = (
  state: NotificationState = initialState,
  action: NotificationActionTypes,
) => {
  switch (action.type) {
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationMessage: action.payload,
      };
    case NOTIFICATION_FAILURE:
      return {
        ...state,
        notificationMessage: action.payload,
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notificationMessage: '',
      };
    default:
      return state;
  }
};

export { notificationReducer };
