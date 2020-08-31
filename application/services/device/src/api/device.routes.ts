import KoaRouter from 'koa-router';
import config from 'config';

import { all, one, create, acl, modify, remove } from './device.controller';
import { validateToken } from '../services/jwt';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router
  .get('/', validateToken, all)

  .get('/:id', validateToken, one)

  .post('/', validateToken, create)

  .post('/mqtt/acl', acl)

  .patch('/:id', validateToken, modify)

  .delete('/:id', validateToken, remove);

export { router };
