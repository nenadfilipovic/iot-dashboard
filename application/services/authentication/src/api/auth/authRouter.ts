import KoaRouter from 'koa-router';

import { login, logout } from './authController';
import { config } from '../../config';

const { baseRoute } = config.appConfig;

const router = new KoaRouter({ prefix: `/${baseRoute}/auth` });

router.post('/login', login);
router.post('/logout', logout);

export { router as authRouter };
