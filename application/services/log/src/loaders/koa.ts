import Koa from 'koa';
import koaHelmet from 'koa-helmet';
import koaBodyparser from 'koa-bodyparser';
import koaCompress from 'koa-compress';
import koaPinoLogger from 'koa-pino-logger';
import { logRouter } from '../routes/log';
import zlib from 'zlib';

const koaServer = ({ app }: { app: Koa }): Koa => {
  app.use(koaHelmet());
  app.use(koaBodyparser());
  app.use(
    koaCompress({
      filter(content_type) {
        return /text/i.test(content_type);
      },
      gzip: {
        flush: zlib.constants.Z_SYNC_FLUSH,
      },
    }),
  );
  if (process.env.NODE_ENV !== 'production') {
    app.use(koaPinoLogger({ prettyPrint: true }));
  }
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message,
      };
    }
  });
  app.use(logRouter.routes());
  app.use(
    logRouter.allowedMethods({
      throw: true,
    }),
  );
  return app;
};

export { koaServer };
