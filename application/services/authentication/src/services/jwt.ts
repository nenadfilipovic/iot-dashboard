import jwt from 'jsonwebtoken';
import config from 'config';

const secret: string = config.get('jwt.secret');
const expiresIn: string = config.get('jwt.expiresIn');

const createToken = (id: string): string => {
  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

export { createToken };
