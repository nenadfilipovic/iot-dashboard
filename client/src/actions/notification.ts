import {
  NotificationActionTypes,
  NOTIFICATION_FAILURE,
  CLEAR_NOTIFICATIONS,
} from '../types';

const notificationFailure = (message: string): NotificationActionTypes => {
  return {
    type: NOTIFICATION_FAILURE,
    payload: message,
  };
};

const clearNotifications = (): NotificationActionTypes => {
  return {
    type: CLEAR_NOTIFICATIONS,
  };
};

export { notificationFailure, clearNotifications };
