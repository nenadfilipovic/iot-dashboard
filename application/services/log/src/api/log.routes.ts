import KoaRouter from 'koa-router';
import config from 'config';

import { create, all } from './log.controller';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router
  .get('/:id', all)

  .post('/:id', create);

export { router };
