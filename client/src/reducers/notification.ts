import {
  NotificationState,
  NotificationActionTypes,
  NOTIFICATION_FAILURE,
  CLEAR_NOTIFICATIONS,
} from '../types';

const initialState: NotificationState = {
  message: '',
};
const notificationReducer = (
  state = initialState,
  action: NotificationActionTypes,
): NotificationState => {
  switch (action.type) {
    case NOTIFICATION_FAILURE:
      return {
        ...state,
        message: action.payload,
      };

    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        message: '',
      };

    default:
      return state;
  }
};

export { notificationReducer };
