import { buildClient } from '../api/client';
import { UserAttributes, UsersApi } from '../types';

const client = buildClient('users');

const _registerUser = async (formData: UserAttributes) => {
  return client.post<UsersApi>('/', formData);
};

const _modifyUser = async (formData: UserAttributes) => {
  return client.patch<UsersApi>('/', formData);
};

const _removeUser = async () => {
  return client.delete('/');
};

const _getCurrentUser = async () => {
  return client.get<UsersApi>('/');
};

const _logUserIn = (formData: UserAttributes) => {
  return client.post<UsersApi>('/login', formData);
};

const _logUserOut = () => {
  return client.post('/logout');
};

export {
  _registerUser,
  _modifyUser,
  _removeUser,
  _getCurrentUser,
  _logUserIn,
  _logUserOut,
};
