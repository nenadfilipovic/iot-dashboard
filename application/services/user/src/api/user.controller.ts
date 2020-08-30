import { DefaultContext } from 'koa';

import { User } from '../models/User';
import { logger } from '../utils/logger';
import { createToken } from '../services/jwt';

/**
 * Register user...
 */

const register = async (ctx: DefaultContext): Promise<void> => {
  const { firstName, lastName, email, password } = ctx.request.body;

  const newUser = User.build({
    firstName,
    lastName,
    email,
    password,
  });

  const user = await newUser.save().then((user) => user);

  const token = createToken(user.id);

  ctx.session = { token };

  ctx.body = {
    status: 'success',
    data: { user },
  };

  logger.info(`User: ${user.id} successfully registered.`);
};

/**
 * Modify user...
 */

const modify = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.state.user;

  const existingUser = await User.findOne({
    where: { id },
  });

  if (!existingUser) throw new Error('User does not exist!');

  const { firstName, lastName, email, password } = ctx.request.body;

  existingUser.update({ firstName, lastName, email, password });

  const user = await existingUser.save().then((user) => user);

  ctx.body = {
    status: 'success',
    data: { user },
  };

  logger.info(`User: ${user.id} data successfully modified.`);
};

/**
 * Delete user...
 */

const remove = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.state.user;

  const existingUser = await User.findOne({
    where: { id },
  });

  if (!existingUser) throw new Error('User does not exist!');

  existingUser.destroy();

  await existingUser.save();

  ctx.session = null;

  ctx.body = {
    status: 'success',
    data: {},
  };

  logger.info(`User: ${existingUser.id} successfully removed.`);
};

/**
 * Get current user...
 */

const me = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.state.user;

  const existingUser = await User.findOne({
    where: { id },
  });

  if (!existingUser) throw new Error('User does not exist!');

  ctx.body = {
    status: 'success',
    data: { user: existingUser },
  };
};

/**
 * Login user...
 */

const login = async (ctx: DefaultContext): Promise<void> => {
  const { email, password } = ctx.request.body;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (!existingUser) throw new Error('User does not exist!');

  const correctPassword = await existingUser.validPassword(password);

  if (!correctPassword) throw new Error('Bad credentials, please try again!');

  const token = createToken(existingUser.id);

  ctx.session = { token };

  ctx.body = {
    status: 'success',
    data: { user: existingUser },
  };

  logger.info(`User: ${existingUser.id} successfully logged in.`);
};

/**
 * Logout user...
 */

const logout = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.state.user;

  ctx.session = null;
  ctx.body = {};

  logger.info(`User: ${id} successfully logged out.`);
};

export { register, modify, remove, me, login, logout };
