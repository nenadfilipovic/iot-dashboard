import KoaRouter from 'koa-router';

import { login, logout } from '../controllers/authentication';

const router = new KoaRouter({ prefix: `/api/auth` });

router.post('/', login);

router.post('/logout', logout);

export { router as authenticationRouter };
