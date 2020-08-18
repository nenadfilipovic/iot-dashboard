import KoaRouter from 'koa-router';
import { config } from '../env/config';

const { baseRoute } = config;

const router = new KoaRouter({ prefix: `/${baseRoute}/log` });

export { router as logRouter };
