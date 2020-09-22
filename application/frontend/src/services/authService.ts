import { iotDashboard } from '../api/iotDashboard';
import { User } from '../types';

const servicePrefix = '/users';

const login = (formData: User) => {
  return iotDashboard.post(servicePrefix + '/login', formData);
};

const register = async (formData: User) => {
  return iotDashboard.post(servicePrefix + '/', formData);
};

const logout = () => {
  return iotDashboard.post(servicePrefix + '/logout');
};

export { login, logout, register };
