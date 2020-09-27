import KoaRouter from 'koa-router';
import config from 'config';

import { validateToken } from '../../middlewares/jwtMiddleware';

import { getAllLogs } from './logController';

const prefix: string = config.get('service.prefix');

const logRouter = new KoaRouter({ prefix });

logRouter.get('/:id', validateToken, getAllLogs);

export { logRouter };
