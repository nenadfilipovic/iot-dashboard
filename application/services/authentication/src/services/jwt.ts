import jwt from 'jsonwebtoken';
import config from 'config';

const jwtSecret: string = config.get('jwt.secret');
const jwtexpiresIn: string = config.get('jwt.expiresIn');

const createToken = (id: string): string => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtexpiresIn,
  });
};

export { createToken };
