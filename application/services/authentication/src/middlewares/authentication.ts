import koaJwt from 'koa-jwt';
import config from 'config';

const jwtSecret: string = config.get('jwt.secret');

const authenticationMiddleware = koaJwt({
  secret: jwtSecret,
});

export { authenticationMiddleware };
