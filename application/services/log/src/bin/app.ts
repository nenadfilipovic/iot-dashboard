import Koa from 'koa';
import koaHelmet from 'koa-helmet';
import koaBodyparser from 'koa-bodyparser';
import koaCompress from 'koa-compress';
import koaPinoLogger from 'koa-pino-logger';
import zlib from 'zlib';

import { errorMiddleware } from '../middleware/errorMiddleware';
import { authRouter } from '../api/auth';

const app = new Koa();

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
  .use(koaPinoLogger({ prettyPrint: true }))
  .use(errorMiddleware)
  .use(authRouter.routes())
  .use(authRouter.allowedMethods({ throw: true }));

export { app };
