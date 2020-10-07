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

import { userRouter } from './components/user';
import { errorMiddleware } from './middlewares/error-middleware';
import { ErrorHandler } from './errors/error-handler';
import { BaseError } from './errors/base-error';

const cookieKey: string = config.get('cookies.key');
const cookieKeyExpiresIn: number = config.get('cookies.expiresIn');

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
        throw new BaseError('Action requires authentication', 401);
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
  .use(userRouter.routes())
  .use(userRouter.allowedMethods({ throw: true }));

export { app };
