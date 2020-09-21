import { iotDashboard } from '../api/iotDashboard';
import { User } from '../types';

const servicePrefix = '/users/auth';

const login = (formData: User) => {
  return iotDashboard.post(servicePrefix + '/login', formData);
};

const register = async (formData: User) => {
  return iotDashboard
    .post(servicePrefix + '/register', formData)
    .then((response) => response.data);
};

const logout = () => {
  return iotDashboard.post(servicePrefix + '/logout', {});
};

export { login, logout, register };
