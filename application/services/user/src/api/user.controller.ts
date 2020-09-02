import { DefaultContext } from 'koa';

import { User } from '../models/User';
import { logger } from '../utils/logger';
import { createToken } from '../services/jwt';

/**
 * Register user...
 */

const register = async (ctx: DefaultContext): Promise<void> => {
  const { name, surname, username, email, password } = ctx.request.body;

  const newUser = User.build({
    name,
    surname,
    username,
    email,
    password,
  });

  const user = await newUser.save().then((user) => user);

  const token = createToken(user.id);

  ctx.session = { token };

  Object.assign(user, { password: undefined });

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
  const loggedInUser = ctx.state.user;

  const existingUser = await User.findOne({
    where: { id: loggedInUser.id },
  });

  if (!existingUser) throw new Error('User does not exist!');

  const { name, surname, email, password } = ctx.request.body;

  existingUser.update({ name, surname, email, password });

  const user = await existingUser.save().then((user) => user);

  Object.assign(user, { password: undefined });

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
  const loggedInUser = ctx.state.user;

  const existingUser = await User.findOne({
    where: { id: loggedInUser.id },
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
  const loggedInUser = ctx.state.user;

  const existingUser = await User.findOne({
    where: { id: loggedInUser.id },
  });

  if (!existingUser) throw new Error('User does not exist!');

  Object.assign(existingUser, { password: undefined });

  ctx.body = {
    status: 'success',
    data: { user: existingUser },
  };
};

/**
 * Login user...
 */

const login = async (ctx: DefaultContext): Promise<void> => {
  const { username, email, password } = ctx.request.body;

  /**
   * Support for logging in via email and username.
   */

  const loginOptions = username ? { username: username } : { email: email };

  const existingUser = await User.findOne({
    where: { ...loginOptions },
    attributes: { include: ['password'] },
  });

  if (!existingUser) throw new Error('User does not exist!');

  const correctPassword = await existingUser.validPassword(password);

  if (!correctPassword) throw new Error('Bad credentials, please try again!');

  const token = createToken(existingUser.id);

  ctx.session = { token };

  Object.assign(existingUser, { password: undefined });

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
  const loggedInUser = ctx.state.user;

  ctx.session = null;
  ctx.body = {};

  logger.info(`User: ${loggedInUser.id} successfully logged out.`);
};

/**
 * MQTT auth route...
 */

const auth = async (ctx: DefaultContext): Promise<void> => {
  const { username, password } = ctx.request.body;

  const existingUser = await User.findOne({
    where: {
      username,
    },
    attributes: { include: ['password'] },
  });

  if (!existingUser) {
    ctx.response.status = 400;
    return;
  }

  const correctPassword = await existingUser.validPassword(password);

  if (!correctPassword) {
    ctx.response.status = 400;
    return;
  }

  ctx.response.status = 200;
};

export { register, modify, remove, me, login, logout, auth };
