import KoaRouter from 'koa-router';

import { create, modify, destroy, getOne } from '../controllers/user';

const router = new KoaRouter({ prefix: `/api/user` });

router.post('/', create);

router.patch('/:id', modify);

router.delete('/:id', destroy);

router.get('/:id', getOne);

export { router as userRouter };
