import KoaRouter from 'koa-router';
import { config } from '../env/config';

const { baseRoute } = config;

const router = new KoaRouter({ prefix: `/${baseRoute}/device` });

export { router as deviceRouter };
