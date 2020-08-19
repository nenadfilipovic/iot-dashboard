import { Context, Next } from 'koa';

import { baseErrorHandler } from '../utils/errors/baseErrorHandler';
import { appLogger } from '../utils/logger';

const errorMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    appLogger.error(error);
    const isOperationalError = await baseErrorHandler.isTrustedError(error);
    if (!isOperationalError) {
      ctx.status = error.statusCode || error.status || 500;
      ctx.body = {
        message: error.message,
      };
    }
  }
};

export { errorMiddleware };
