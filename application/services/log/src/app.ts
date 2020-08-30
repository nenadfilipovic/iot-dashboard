import Koa, { Context } from 'koa';
import koaHelmet from 'koa-helmet';
import koaBodyparser from 'koa-bodyparser';
import koaCompress from 'koa-compress';
import koaLogger from 'koa-logger';
import koaSession from 'koa-session';
import koaJwt from 'koa-jwt';
import zlib from 'zlib';
import config from 'config';

import { router } from './api/log.routes';

const secret: string = config.get('jwt.secret');
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
  app.use(koaLogger());
}

app
  .use(
    koaJwt({
      secret,
      getToken: function name(ctx: Context) {
        if (ctx.session) {
          return ctx.session.token;
        }
        return null;
      },
    }),
  )
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
  // todo error middleware
  .use(router.routes())
  .use(router.allowedMethods({ throw: true }));

export { app };
