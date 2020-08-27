import KoaRouter from 'koa-router';
import config from 'config';

import { login } from './auth.controller';
import { logout } from './auth.controller';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router.post('/', login);

router.post('/logout', logout);

export { router };
