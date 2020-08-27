import KoaRouter from 'koa-router';
import config from 'config';

import { create, modify, disable, getOne } from './user.controller';
import { validateToken } from '../services/jwt';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router.post('/', create);

router.patch('/:id', validateToken, modify);

router.delete('/:id', validateToken, disable);

router.get('/:id', validateToken, getOne);

export { router };
