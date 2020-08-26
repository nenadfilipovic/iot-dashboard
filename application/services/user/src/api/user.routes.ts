import KoaRouter from 'koa-router';

import { create, modify, disable, getOne } from './user.controller';

const router = new KoaRouter({ prefix: `/api/user` });

router.post('/', create);

router.patch('/:id', modify);

router.delete('/:id', disable);

router.get('/:id', getOne);

export { router };
