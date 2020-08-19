import KoaRouter from 'koa-router';

import { add, update, remove, getSingle, getAll } from './deviceController';
import { config } from '../../config';

const { baseRoute } = config.appConfig;

const router = new KoaRouter({ prefix: `/${baseRoute}/device` });

router.post('/add', add);
router.post('/update', update);
router.post('/remove', remove);
router.get('/single:id', getSingle);
router.get('/all', getAll);

export { router as deviceRouter };
