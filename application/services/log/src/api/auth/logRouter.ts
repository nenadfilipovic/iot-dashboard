import KoaRouter from 'koa-router';

import { getAll, removeAll } from './logController';
import { config } from '../../config';

const { baseRoute } = config.appConfig;

const router = new KoaRouter({ prefix: `/${baseRoute}/log` });

router.get('/all', getAll);
router.post('/empty', removeAll);

export { router as logRouter };
