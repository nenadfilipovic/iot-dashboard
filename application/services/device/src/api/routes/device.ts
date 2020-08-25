import KoaRouter from 'koa-router';
import config from 'config';

import { create } from '../controllers/create';
import { modify } from '../controllers/modify';
import { destroy } from '../controllers/destroy';
import { getOne } from '../controllers/get-one';
import { getMany } from '../controllers/get-many';

const servicePrefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix: servicePrefix });

router.post('/', create);

router.patch('/:id', modify);

router.delete('/:id', destroy);

router.get('/:id', getOne);

router.get('/', getMany);

export { router };
