import {
  NotificationState,
  NotificationActionTypes,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  CLEAR_NOTIFICATIONS,
} from '../types';

const initialState: NotificationState = {
  type: '',
  message: '',
};
const notificationReducer = (
  state = initialState,
  action: NotificationActionTypes,
): NotificationState => {
  switch (action.type) {
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        type: action.payload,
        message: action.payload,
      };

    case NOTIFICATION_FAILURE:
      return {
        ...state,
        type: action.payload,
        message: action.payload,
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        type: '',
        message: '',
      };

    default:
      return state;
  }
};

export { notificationReducer };
