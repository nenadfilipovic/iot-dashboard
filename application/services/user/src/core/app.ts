import Koa from 'koa';
import koaHelmet from 'koa-helmet';
import koaBodyparser from 'koa-bodyparser';
import koaCompress from 'koa-compress';
import koaLogger from 'koa-logger';
import koaSession from 'koa-session';
import zlib from 'zlib';
import config from 'config';

import { errorMiddleware } from '../middlewares/error';
import { router } from '../api/routes/user';

const serviceCookieKey: string = config.get('service.cookieKey');
const serviceCookieKeyExpiresIn: number = config.get(
  'service.cookieKeyExpiresIn',
);

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  app.use(koaLogger());
}

app.keys = [serviceCookieKey];

const appConfig = {
  key: 'session',
  maxAge: serviceCookieKeyExpiresIn * 60 * 60 * 1000,
  httpOnly: true,
  signed: true,
  secure: false,
};

app
  .use(koaSession(appConfig, app))
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
  .use(errorMiddleware)
  .use(router.routes())
  .use(router.allowedMethods({ throw: true }));

export { app };
