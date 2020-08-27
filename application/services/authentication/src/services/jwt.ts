import jwt from 'jsonwebtoken';
import koaJwt from 'koa-jwt';
import config from 'config';

const secret: string = config.get('jwt.secret');
const expiresIn: string = config.get('jwt.expiresIn');

const createToken = (id: string): string => {
  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

const validateToken = koaJwt({
  secret,
  cookie: 'session',
});

export { createToken, validateToken };
