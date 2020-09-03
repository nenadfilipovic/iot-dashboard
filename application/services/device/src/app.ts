import Koa from 'koa';
import koaHelmet from 'koa-helmet';
import koaBodyparser from 'koa-bodyparser';
import koaCompress from 'koa-compress';
import koaLogger from 'koa-logger';
import koaSession from 'koa-session';
import zlib from 'zlib';
import config from 'config';

import { router } from './api/device.routes';
import {errorMiddleware} from "./services/error"
import { AuthenticationError } from './errors/AuthenticationError';


const cookieKey: string = config.get('service.cookieKey');
const cookieKeyExpiresIn: number = config.get('service.cookieKeyExpiresIn');

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  app.use(koaLogger());
}

app.keys = [cookieKey];

const sessionConfig = {
  key: 'session',
  maxAge: cookieKeyExpiresIn * 60 * 60 * 1000,
  httpOnly: true,
  signed: true,
  secure: false,
};

app
  .use(errorMiddleware)
  .use(async function (ctx, next) {
    return next().catch((error) => {
      if (401 == error.status) {
        ctx.status = 401;
        throw new AuthenticationError(error.message);
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
  .use(router.routes())
  .use(router.allowedMethods({ throw: true }));

export { app };
