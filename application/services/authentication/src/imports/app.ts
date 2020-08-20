import Koa from 'koa';
import koaHelmet from 'koa-helmet';
import koaBodyparser from 'koa-bodyparser';
import koaCompress from 'koa-compress';
import koaLogger from 'koa-logger';
import zlib from 'zlib';

import { errorMiddleware } from '../middlewares';
import { authRouter } from '../api';

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  app.use(koaLogger());
}

app
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
  .use(authRouter.routes())
  .use(authRouter.allowedMethods({ throw: true }));

export { app };
