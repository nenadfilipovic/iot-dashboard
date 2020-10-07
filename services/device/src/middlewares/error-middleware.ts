import { Context, Next } from 'koa';
import { BaseError } from '../errors/base-error';

import { ErrorHandler } from '../errors/error-handler';

const errorMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      error = handleDuplicateFields(error);
    }
    const isOperationalError = ErrorHandler.isTrustedError(error);
    if (isOperationalError || error.isJoi) {
      ctx.status = error.statusCode || error.status || 400;
      if (process.env.NODE_ENV === 'development') {
        ctx.body = {
          status: error.status || 'fail',
          data: error.message,
          stack: error.stack,
        };
      } else if (process.env.NODE_ENV === 'production') {
        ctx.body = {
          status: error.status || 'fail',
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

const handleDuplicateFields = (error: Error) => {
  return new BaseError(error.message, 400);
};

export { errorMiddleware };
