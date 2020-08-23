import KoaRouter from 'koa-router';

import { login, logout } from '../controllers/auth';

const router = new KoaRouter({ prefix: `/api/auth` });

router.post('/', login);

router.post('/logout', logout);

export { router as authenticationRouter };
