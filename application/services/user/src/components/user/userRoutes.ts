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
import { validateToken } from '../../middlewares/jwtMiddleware';

const prefix: string = config.get('service.prefix');

const userRouter = new KoaRouter({ prefix });

userRouter
  .get('/', validateToken, getCurrentUser)

  .post('/', registerUser)

  .post('/login', logUserIn)

  .post('/logout', validateToken, logUserOut)

  .post('/mqtt/auth', mqttAuth)

  .patch('/', validateToken, modifyUser)

  .delete('/', validateToken, removeUser);

export { userRouter };
