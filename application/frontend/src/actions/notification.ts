import {
  NotificationActionTypes,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  CLEAR_NOTIFICATIONS,
} from '../types/ActionTypes';
import { NotificationState } from '../types/StateTypes';

const notificationSuccess = (
  message: NotificationState,
): NotificationActionTypes => {
  return {
    type: NOTIFICATION_SUCCESS,
    payload: message,
  };
};

const notificationFailure = (
  message: NotificationState,
): NotificationActionTypes => {
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

export { notificationSuccess, notificationFailure, clearNotifications };
