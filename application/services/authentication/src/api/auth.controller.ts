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

  if (!existingUser.isActive)
    throw new Error(
      'This user is disabled, if you want to enable you account please visit login page!',
    );

  const correctPassword = await existingUser.validPassword(password);

  if (!correctPassword) {
    throw new Error(
      'User with provided credentials does not exist, please check your email or password!',
    );
  }

  const token = createToken(existingUser.id);

  ctx.session = { token };

  ctx.body = {
    status: 'success',
    data: {},
  };
};

/**
 * Logout user...
 */

const logout = async (ctx: DefaultContext): Promise<void> => {
  ctx.session = null;
  ctx.body = {};
};

/**
 * Add user via event...
 */
const create = async (ctx: DefaultContext): Promise<void> => {};

export { login, logout };
