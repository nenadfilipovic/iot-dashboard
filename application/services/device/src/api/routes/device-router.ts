import KoaRouter from 'koa-router';

import { add, update, remove, getSingle, getAll } from '../controllers/device-controller';

const router = new KoaRouter({ prefix: `/api/device` });

router.post('/add', add);
router.post('/update', update);
router.post('/remove', remove);
router.get('/single:id', getSingle);
router.get('/all', getAll);

export { router as deviceRouter };
