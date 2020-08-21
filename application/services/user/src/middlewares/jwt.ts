import koaJwt from 'koa-jwt';

import { jwtSecret } from '../config';

const jwtMiddleware = koaJwt({
  secret: jwtSecret,
});

export { jwtMiddleware };
