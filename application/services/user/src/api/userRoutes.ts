import KoaRouter from 'koa-router';
import config from 'config';

import {
  registerUser,
  modifyUser,
  removeUser,
  getCurrentUser,
  logUserIn,
  logUserOut,
  mqttAuth,
} from './userController';
import { validateToken } from '../services/jwt';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router
  .get('/', validateToken, getCurrentUser)

  .post('/', registerUser)

  .post('/login', logUserIn)

  .post('/logout', validateToken, logUserOut)

  .post('/mqtt/auth', mqttAuth)

  .patch('/', validateToken, modifyUser)

  .delete('/', validateToken, removeUser);

export { router };
