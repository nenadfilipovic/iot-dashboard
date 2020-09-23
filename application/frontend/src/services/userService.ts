import { client } from '../api/client';
import { User } from '../types';

const _registerUser = async (formData: User) => {
  return client.post('/users', formData);
};

const _modifyUser = async (formData: User) => {
  return client.patch('/users', formData);
};

const _removeUser = async () => {
  return client.delete('/users');
};

const _getCurrentUser = async () => {
  return client.get('/users');
};

export { _registerUser, _modifyUser, _removeUser, _getCurrentUser };
