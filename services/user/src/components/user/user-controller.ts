import { DefaultContext } from 'koa';

import { User } from './user-model';
import { createToken } from '../../middlewares/jwt-middleware';
import { UserAttributes } from './user-types';
import { BaseError } from '../../errors/base-error';
import { Errors } from './user-errors';
import { userRemovedPublisher } from '../../event-bus/publishers';
import { userSchema } from './user-validation';

/**
 * Register user
 */

const registerUser = async (ctx: DefaultContext): Promise<void> => {
  const validatedData = (await userSchema.validateAsync(
    { ...ctx.request.body },
    {
      presence: 'required',
    },
  )) as UserAttributes;

  const newUser = User.create({
    ...validatedData,
  });

  const user = await User.save(newUser);

  const token = createToken(user.handle);

  ctx.session = { token };

  ctx.response.status = 201;

  ctx.body = {
    status: 'success',
    message: 'You have successfully registered new account',
    data: user,
  };
};

/**
 * Modify user
 */

const modifyUser = async (ctx: DefaultContext): Promise<void> => {
  const validatedData = (await userSchema.validateAsync(
    { ...ctx.request.body },
    {
      context: { update: true },
    },
  )) as UserAttributes;

  const handle = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { handle },
  });

  if (!existingUser) throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);

  Object.assign(existingUser, { ...validatedData });

  const user = await existingUser.save();

  ctx.body = {
    status: 'success',
    message: 'You have successfully modified your data',
    data: user,
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

  await User.remove(existingUser);

  ctx.session = null;

  ctx.response.status = 204;

  ctx.body = {
    status: 'success',
    data: null,
  };

  userRemovedPublisher(existingUser.handle);
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
    data: user,
  };
};

/**
 * Login user
 */

const logUserIn = async (ctx: DefaultContext): Promise<void> => {
  const validatedData = (await userSchema.validateAsync(
    {
      ...ctx.request.body,
    },
    { context: { login: true } },
  )) as UserAttributes;

  const user = await User.findOne({
    where: { handle: validatedData.handle },
  });

  if (!user) throw new BaseError(Errors.USER_DOES_NOT_EXIST, 400);

  const correctPassword = await user.validatePassword(validatedData.password);

  if (!correctPassword) {
    throw new BaseError(Errors.BAD_CREDENTIALS, 401);
  }

  const token = createToken(user.handle);

  ctx.session = { token };

  ctx.body = {
    status: 'success',
    message: 'You have successfully logged in',
    data: user,
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
  const validatedData = (await userSchema.validateAsync(
    { ...ctx.request.body },
    { stripUnknown: true },
  )) as UserAttributes;

  const existingUser = await User.findOne({
    where: { handle: validatedData.handle },
  });

  if (!existingUser) {
    ctx.response.status = 400;
    return;
  }

  const correctPassword = await existingUser.validatePassword(
    validatedData.password,
  );

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
