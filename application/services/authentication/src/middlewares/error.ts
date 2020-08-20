import { Context, Next } from 'koa';

import { errorHandler } from '../helpers';
import { appLogger } from '../utils';

const errorMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    appLogger.error(error);
    const isOperationalError = errorHandler.isTrustedError(error);
    if (!isOperationalError) {
      ctx.status = error.statusCode || error.status || 500;
      ctx.body = {
        message: error.message,
      };
    }
  }
};

export { errorMiddleware };
