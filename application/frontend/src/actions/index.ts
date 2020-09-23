import { logUserIn, logUserOut } from './authentication';
import { registerUser, modifyUser, removeUser, getCurrentUser } from './user';
import {
  notificationSuccess,
  notificationFailure,
  clearNotifications,
} from './notification';
import { actionStart, actionStop } from './system';
import {
  getAllDevices,
  getSingleDevice,
  registerDevice,
  modifyDevice,
  removeDevice,
} from './device';

export {
  logUserIn,
  logUserOut,
  registerUser,
  modifyUser,
  removeUser,
  getCurrentUser,
  notificationSuccess,
  notificationFailure,
  clearNotifications,
  actionStart,
  actionStop,
  getAllDevices,
  getSingleDevice,
  registerDevice,
  modifyDevice,
  removeDevice,
};
