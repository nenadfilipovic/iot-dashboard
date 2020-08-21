import KoaRouter from 'koa-router';

import {
  create,
  modify,
  destroy,
  getOne,
  getMany,
} from '../controllers/device';

const router = new KoaRouter({ prefix: `/api/device` });

router.post('/', create);

router.patch('/:id', modify);

router.delete('/:id', destroy);

router.get('/:id', getOne);

router.get('/', getMany);

export { router as deviceRouter };
