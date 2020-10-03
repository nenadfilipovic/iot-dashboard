import KoaRouter from 'koa-router';
import config from 'config';

import { validateToken } from '../../middlewares/jwt-middleware';
import { getAllLogs } from './log-controller';

const prefix: string = config.get('services.log.prefix');

const logRouter = new KoaRouter({ prefix });

logRouter.get('/:id', validateToken, getAllLogs);

export { logRouter };
