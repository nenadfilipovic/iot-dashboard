import { client } from '../api/client';
import { User } from '../types';

const _logUserIn = (formData: User) => {
  return client.post('/users/login', formData);
};

const _logUserOut = () => {
  return client.post('/users/logout');
};

export { _logUserIn, _logUserOut };
