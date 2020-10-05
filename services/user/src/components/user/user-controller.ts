import { DefaultContext } from 'koa';

import { User } from './user-model';
import { appLogger } from '../../utils/logger';
import { createToken } from '../../middlewares/jwt-middleware';
import { UserAttributes } from './user-types';
import { BaseError } from '../../errors/base-error';
import { Errors } from './user-errors';
import { userRemovedPublisher } from '../../event-bus/publishers';

/**
 * Register user
 */

const registerUser = async (ctx: DefaultContext): Promise<void> => {
  const newUser = User.create({
    ...(ctx.request.body as UserAttributes),
  });

  const user = await User.save(newUser);

  const token = createToken(user.handle);

  ctx.session = { token };

  ctx.body = {
    status: 'success',
    data: { user },
  };
};

/**
 * Modify user
 */

const modifyUser = async (ctx: DefaultContext): Promise<void> => {
  const handle = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { handle },
  });

  if (!existingUser) throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);

  const user = await User.save({
    ...existingUser,
    ...ctx.request.body,
  });

  //ctx.session = null;

  ctx.body = {
    status: 'success',
    data: { user },
  };
};

/**
 * Delete user
 */

const removeUser = async (ctx: DefaultContext): Promise<void> => {
  const handle = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { handle },
  });

  if (!existingUser) throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);

  await User.delete(existingUser.id);

  ctx.session = null;

  ctx.body = {
    status: 'success',
    data: null,
  };

  userRemovedPublisher(existingUser.handle);

  appLogger.info(`User: ${existingUser.id} successfully removed.`);
};

/**
 * Get current user
 */

const getCurrentUser = async (ctx: DefaultContext): Promise<void> => {
  const userHandle = ctx.state.user.id;

  const user = await User.findOne({ where: { userHandle } });

  if (!user) {
    throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);
  }

  Object.assign(user, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully retrieved your account data.',
    data: user,
  };
};

/**
 * Login user
 */

const logUserIn = async (ctx: DefaultContext): Promise<void> => {
  const { handle, password } = ctx.request.body as UserAttributes;

  const existingUser = await User.findOne({
    where: { handle },
  });

  if (!existingUser) throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);

  const correctPassword = await existingUser.validatePassword(password);

  if (!correctPassword) {
    throw new BaseError(Errors.BAD_CREDENTIALS, 400);
  }

  const token = createToken(existingUser.handle);

  ctx.session = { token };

  Object.assign(existingUser, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully logged in.',
    data: existingUser,
  };
};

/**
 * Logout user
 */

const logUserOut = async (ctx: DefaultContext): Promise<void> => {
  ctx.session = null;

  ctx.body = {
    status: 'success',
    message: 'You have successfully logged out.',
  };
};

/**
 * MQTT auth route
 */

const mqttAuth = async (ctx: DefaultContext): Promise<void> => {
  const { handle, password } = ctx.request.body as UserAttributes;

  const existingUser = await User.findOne({
    where: { handle },
  });

  if (!existingUser) {
    ctx.response.status = 400;
    return;
  }

  const correctPassword = await existingUser.validatePassword(password);

  if (!correctPassword) {
    ctx.response.status = 400;
    return;
  }

  ctx.response.status = 200;
};

export {
  registerUser,
  modifyUser,
  removeUser,
  getCurrentUser,
  logUserIn,
  logUserOut,
  mqttAuth,
};
