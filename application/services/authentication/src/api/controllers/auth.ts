import { Context } from 'koa';
import jwt from 'jsonwebtoken';

import { Password } from '../../helpers/password';
import { jwtSecret } from '../../config';
import { loginSchema } from '../../helpers/data-validation';
import { Authentication } from '../models/auth';

const login = async (ctx: Context): Promise<void> => {
  /*
  const { email, password } = ctx.request.body;

  const { error, value: validData } = loginSchema.validate({ email, password });

  if (error) {
    throw new Error('Bad request');
  }

  const existingUser = await Authentication.findOne({
    where: { email: validData.email },
  });

  if (!existingUser) {
    throw new Error('User with provided email does not exist.');
  }

  const correctPassword = await Password.compare(
    existingUser.password,
    validData.password,
  );

  if (!correctPassword) {
    throw new Error('Provided password is not correct.');
  }

  const token = jwt.sign({ id: existingUser.user_id }, jwtSecret);

  ctx.body = { existingUser };
  */
};

const logout = async (ctx: Context): Promise<void> => {
  /**
   * Set session as null, delete session
   */
};

export { login, logout };
