import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import pino from 'koa-pino-logger';
import zlib from 'zlib';

const koaServer = ({ app }: { app: Koa }): Koa => {
  app.use(helmet());
  app.use(bodyParser());
  app.use(
    compress({
      filter(content_type) {
        return /text/i.test(content_type);
      },
      gzip: {
        flush: zlib.constants.Z_SYNC_FLUSH,
      },
    }),
  );
  app.use(pino);
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
  return app;
};

export { koaServer };
