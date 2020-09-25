import { Context, Next } from 'koa';

import { errorHandler } from '../errors/handler';

const errorMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    const isOperationalError = errorHandler.isTrustedError(error);
    if (isOperationalError) {
      if (process.env.NODE_ENV === 'development') {
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = {
          status: error.status,
          message: error.message,
          stack: error.stack,
        };
      } else if (process.env.NODE_ENV === 'production') {
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = {
          status: error.status,
          message: error.message,
        };
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong, please try again later',
      };
    }
    ctx.app.emit('error', error, ctx);
  }
};

export { errorMiddleware };
