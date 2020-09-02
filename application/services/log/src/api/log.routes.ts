import KoaRouter from 'koa-router';
import config from 'config';

import { all } from './log.controller';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router.get('/:id', all);

export { router };
