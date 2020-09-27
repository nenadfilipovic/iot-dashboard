import 'reflect-metadata';
import Koa from 'koa';
import koaHelmet from 'koa-helmet';
import koaBodyparser from 'koa-bodyparser';
import koaCompress from 'koa-compress';
import koaLogger from 'koa-logger';
import koaSession from 'koa-session';
import koaCors from '@koa/cors';
import zlib from 'zlib';
import config from 'config';

import { deviceRouter } from './components/device';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { ErrorHandler } from './errors/ErrorHandler';
import { BaseError } from './errors/BaseError';

const cookieKey: string = config.get('service.cookieKey');
const cookieKeyExpiresIn: number = config.get('service.cookieKeyExpiresIn');

const app = new Koa();

app.keys = [cookieKey];

const sessionConfig = {
  key: 'session',
  maxAge: cookieKeyExpiresIn * 60 * 60 * 1000,
  httpOnly: true,
  signed: true,
  secure: false,
};

if (process.env.NODE_ENV === 'development') {
  app.use(koaLogger()).use(koaCors({ credentials: true }));
}

app
  .on('error', (error) => {
    ErrorHandler.handleError(error);
  })
  .use(errorMiddleware)
  .use(async function (ctx, next) {
    return next().catch((error) => {
      if (401 == error.status) {
        ctx.status = 401;
        throw new BaseError('Action requires authentication!', 401);
      } else {
        throw error;
      }
    });
  })
  .use(koaSession(sessionConfig, app))
  .use(koaBodyparser())
  .use(koaHelmet())
  .use(
    koaCompress({
      filter(content_type) {
        return /text/i.test(content_type);
      },
      gzip: {
        flush: zlib.constants.Z_SYNC_FLUSH,
      },
    }),
  )
  .use(deviceRouter.routes())
  .use(deviceRouter.allowedMethods({ throw: true }));

export { app };
