import { DefaultContext } from 'koa';

import { Authentication } from '../models/Auth';
import { createToken } from '../services/jwt';

/**
 * Login user...
 */

const login = async (ctx: DefaultContext): Promise<void> => {
  const { email, password } = ctx.request.body;

  const existingUser = await Authentication.findOne({
    where: { email },
  });

  if (!existingUser) {
    throw new Error(
      'User with provided credentials does not exist, please check your email or password!',
    );
  }

  const correctPassword = existingUser.validPassword(password);

  if (!correctPassword) {
    throw new Error(
      'User with provided credentials does not exist, please check your email or password!',
    );
  }

  const token = createToken(existingUser.id);

  ctx.session = { token };

  Object.assign(existingUser, { password: undefined });

  ctx.body = {
    status: 'success',
    data: { user: existingUser },
  };
};

/**
 * Logout user...
 */

const logout = async (ctx: DefaultContext): Promise<void> => {
  ctx.session = null;
  ctx.body = {};
};

export { login, logout };
