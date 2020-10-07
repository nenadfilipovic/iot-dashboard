import { client } from '../api/client';
import { UserAttributes } from '../types';

const _registerUser = async (formData: UserAttributes) => {
  return client.post('/users', formData);
};

const _modifyUser = async (formData: UserAttributes) => {
  return client.patch('/users', formData);
};

const _removeUser = async () => {
  return client.delete('/users');
};

const _getCurrentUser = async () => {
  return client.get('/users');
};

const _logUserIn = (formData: UserAttributes) => {
  return client.post('/users/login', formData);
};

const _logUserOut = () => {
  return client.post('/users/logout');
};

export {
  _registerUser,
  _modifyUser,
  _removeUser,
  _getCurrentUser,
  _logUserIn,
  _logUserOut,
};
