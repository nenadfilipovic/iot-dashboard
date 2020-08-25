import KoaRouter from 'koa-router';

import { create } from '../controllers/create';
import { modify } from '../controllers/modify';
import { destroy } from '../controllers/destroy';
import { getOne } from '../controllers/get-one';

const router = new KoaRouter({ prefix: `/api/user` });

router.post('/', create);

router.patch('/:id', modify);

router.delete('/:id', destroy);

router.get('/:id', getOne);

export { router };
