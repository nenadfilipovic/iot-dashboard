import KoaRouter from 'koa-router';
import config from 'config';

import {
  me,
  register,
  login,
  logout,
  auth,
  modify,
  remove,
} from './user.controller';
import { validateToken } from '../services/jwt';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router
  .get('/me', validateToken, me)

  .post('/', register)

  .post('/login', login)

  .post('/logout', logout)

  .post('/mqtt/auth', auth)

  .patch('/', validateToken, modify)

  .delete('/', validateToken, remove);

export { router };
