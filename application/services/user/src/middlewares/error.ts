import { Context, Next } from 'koa';

const errorMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      ctx.status = error.statusCode || error.status || 500;
      ctx.body = {
        status: error.status,
        message: error.message,
        description: error.description,
        stack: error.stack,
      };
    } else if (process.env.NODE_ENV === 'production') {
      ctx.status = error.statusCode || error.status || 500;
      ctx.body = {
        status: error.status,
        message: error.message,
        description: error.description,
      };
    }
  }
};

export { errorMiddleware };
