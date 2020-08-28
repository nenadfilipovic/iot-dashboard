import jwt from 'jsonwebtoken';
import koaJwt from 'koa-jwt';
import config from 'config';
import { Context } from 'koa';

const secret: string = config.get('jwt.secret');
const expiresIn: string = config.get('jwt.expiresIn');

const createToken = (id: string): string => {
  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

const validateToken = koaJwt({
  secret,
  getToken: function name(ctx: Context) {
    if (ctx.session) {
      return ctx.session.token;
    }
    return null;
  },
});

export { createToken, validateToken };
