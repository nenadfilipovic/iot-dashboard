import KoaRouter from 'koa-router';
import config from 'config';

import { register, modify, remove, me, login, logout } from './user.controller';
import { validateToken } from '../services/jwt';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router
  .get('/me', validateToken, me)

  .post('/', register)

  .post('/login', login)

  .post('/logout', validateToken, logout)

  .patch('/', validateToken, modify)

  .delete('/', validateToken, remove);

export { router };
