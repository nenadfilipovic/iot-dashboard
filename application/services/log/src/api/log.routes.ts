import KoaRouter from 'koa-router';
import config from 'config';

import { getAll, destroyAll, create } from './log.controller';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router.get('/', getAll);

router.delete('/', destroyAll);

router.post('/', create);

export { router };
