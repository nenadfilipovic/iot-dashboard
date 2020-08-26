import KoaRouter from 'koa-router';
import config from 'config';

import { create, modify, destroy, getOne, getMany } from './device.controller';

const servicePrefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix: servicePrefix });

router.post('/', create);

router.patch('/:id', modify);

router.delete('/:id', destroy);

router.get('/:id', getOne);

router.get('/', getMany);

export { router };
