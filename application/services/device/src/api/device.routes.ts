import KoaRouter from 'koa-router';
import config from 'config';

import { create, modify, one, all, remove } from './device.controller';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router
  .get('/', all)

  .get('/:id', one)

  .post('/', create)

  .patch('/:id', modify)

  .delete('/:id', remove);

export { router };
