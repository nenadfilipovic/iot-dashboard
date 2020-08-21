import KoaRouter from 'koa-router';

import { getMany, destroyMany } from '../controllers/log';

const router = new KoaRouter({ prefix: `/api/log` });

router.get('/', getMany);

router.delete('/', destroyMany);

export { router as logRouter };
