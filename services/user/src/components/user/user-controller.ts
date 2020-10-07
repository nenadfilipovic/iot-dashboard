import { DefaultContext } from 'koa';

import { User } from './user-model';
import { appLogger } from '../../utils/logger';
import { createToken } from '../../middlewares/jwt-middleware';
import { UserAttributes } from './user-types';
import { BaseError } from '../../errors/base-error';
import { Errors } from './user-errors';
import { userRemovedPublisher } from '../../event-bus/publishers';
import { registerSchema, modifySchema, loginSchema } from './user-validation';

/**
 * Register user
 */

const registerUser = async (ctx: DefaultContext): Promise<void> => {
  await registerSchema.validateAsync({ ...ctx.request.body });

  const newUser = User.create({
    ...(ctx.request.body as UserAttributes),
  });

  const user = await User.save(newUser);

  const token = createToken(user.handle);

  ctx.session = { token };

  ctx.body = {
    status: 'success',
    message: 'You have successfully registered new account',
    data: { ...user },
  };
};

/**
 * Modify user
 */

const modifyUser = async (ctx: DefaultContext): Promise<void> => {
  await modifySchema.validateAsync({ ...ctx.request.body });

  const handle = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { handle },
  });

  if (!existingUser) throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);

  Object.assign(existingUser, { ...ctx.request.body });

  const user = await existingUser.save();

  ctx.body = {
    status: 'success',
    message: 'You have successfully modified your data',
    data: { ...user },
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
    data: null,
  };

  userRemovedPublisher(existingUser.handle);

  appLogger.info(`User: ${existingUser.id} successfully removed`);
};

/**
 * Get current user
 */

const getCurrentUser = async (ctx: DefaultContext): Promise<void> => {
  const handle = ctx.state.user.id;

  const user = await User.findOne({ where: { handle } });

  if (!user) {
    throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);
  }

  ctx.body = {
    status: 'success',
    data: { ...user },
  };
};

/**
 * Login user
 */

const logUserIn = async (ctx: DefaultContext): Promise<void> => {
  await loginSchema.validateAsync({ ...ctx.request.body });

  const { handle, password } = ctx.request.body as UserAttributes;

  const user = await User.findOne({
    where: { handle },
  });

  if (!user) throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);

  const correctPassword = await user.validatePassword(password);

  if (!correctPassword) {
    throw new BaseError(Errors.BAD_CREDENTIALS, 400);
  }

  const token = createToken(user.handle);

  ctx.session = { token };

  ctx.body = {
    status: 'success',
    data: { user },
  };
};

/**
 * Logout user
 */

const logUserOut = async (ctx: DefaultContext): Promise<void> => {
  ctx.session = null;

  ctx.body = {
    status: 'success',
    data: null,
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
