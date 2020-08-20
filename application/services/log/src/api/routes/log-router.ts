import KoaRouter from 'koa-router';

import { getAll, removeAll } from '../controllers/log-controller';

const router = new KoaRouter({ prefix: `/api/log` });

router.get('/all', getAll);
router.post('/empty', removeAll);

export { router as logRouter };
