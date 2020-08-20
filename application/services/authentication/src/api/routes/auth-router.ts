import KoaRouter from 'koa-router';

import { login, logout } from '../controllers/auth-controller';

const router = new KoaRouter({ prefix: `/api/auth` });

router.post('/login', login);
router.post('/logout', logout);

export { router as authRouter };
