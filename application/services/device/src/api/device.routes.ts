import KoaRouter from 'koa-router';
import config from 'config';

import { create, modify, disable, getOne, getMany } from './device.controller';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router.post('/', create);

router.patch('/:id', modify);

router.delete('/:id', disable);

router.get('/:id', getOne);

router.get('/', getMany);

export { router };
