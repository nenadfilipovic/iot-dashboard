import koaJwt from 'koa-jwt';

import { appConfig } from '../config';

const { jwtSecret } = appConfig;

const jwtMiddleware = koaJwt({
  secret: jwtSecret,
});

export { jwtMiddleware };
