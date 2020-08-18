import KoaRouter from 'koa-router';
import { login } from '../controllers/login';
import { logout } from '../controllers/logout';
import { config } from '../env/config';

const { baseRoute } = config;

const router = new KoaRouter({ prefix: `/${baseRoute}/auth` });

router.post('/login', login);
router.post('/logout', logout);

export { router as authRouter };
