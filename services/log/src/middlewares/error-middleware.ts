import { Context, Next } from 'koa';

import { ErrorHandler } from '../errors/error-handler';

const errorMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if (ErrorHandler.isTrustedError(error)) {
      ctx.status = error.statusCode;
      if (process.env.NODE_ENV === 'development') {
        ctx.body = {
          status: error.status,
          message: error.message,
          error: error,
          stack: error.stack,
        };
      } else if (process.env.NODE_ENV === 'production') {
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
