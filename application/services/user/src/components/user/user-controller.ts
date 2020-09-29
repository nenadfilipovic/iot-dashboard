import { DefaultContext } from 'koa';

import { User } from './user-model';
import { logger } from '../../utils/logger';
import { createToken } from '../../middlewares/jwt-middleware';
import { UserAttributes } from './user-types';
import { BaseError } from '../../errors/base-error';
import { errors } from './user-errors';

/**
 * Register user
 */

const registerUser = async (ctx: DefaultContext): Promise<void> => {
  const {
    userHandle,
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  } = ctx.request.body as UserAttributes;

  const existingUser = await User.findOne({
    where: [{ userHandle }, { userEmailAddress }],
  });

  if (existingUser) throw new BaseError(errors.USER_ALREADY_EXIST, 400);

  const newUser = User.create({
    userHandle,
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  });

  const user = await User.save(newUser);

  const token = createToken(user.userHandle);

  ctx.session = { token };

  Object.assign(user, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully registered new account.',
    data: user,
  };

  logger.info(`User: ${user.userUniqueIndentifier} successfully registered.`);
};

/**
 * Modify user
 */

const modifyUser = async (ctx: DefaultContext): Promise<void> => {
  const userHandle = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { userHandle },
  });

  if (!existingUser) throw new BaseError(errors.USER_DOES_NOT_EXIST, 400);

  const { userFirstName, userLastName, userEmailAddress, userPassword } = ctx
    .request.body as UserAttributes;

  const emailAlreadyUsed = await User.findOne({
    where: { userEmailAddress },
  });

  if (emailAlreadyUsed) throw new BaseError(errors.USER_ALREADY_EXIST, 400);

  const modifiedUser = User.merge(existingUser, {
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  });

  const user = await User.save(modifiedUser);

  Object.assign(user, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully updated your data.',
    data: user,
  };

  logger.info(
    `User: ${user.userUniqueIndentifier} data successfully modified.`,
  );
};

/**
 * Delete user
 */

const removeUser = async (ctx: DefaultContext): Promise<void> => {
  const userHandle = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { userHandle },
  });

  if (!existingUser) throw new BaseError(errors.USER_DOES_NOT_EXIST, 400);

  await User.delete(existingUser);

  ctx.session = null;

  ctx.body = {
    status: 'success',
    message: 'You have successfully deleted your account.',
  };

  logger.info(
    `User: ${existingUser.userUniqueIndentifier} successfully removed.`,
  );
};

/**
 * Get current user
 */

const getCurrentUser = async (ctx: DefaultContext): Promise<void> => {
  const userHandle = ctx.state.user.id;

  const user = await User.findOne({ where: { userHandle } });

  if (!user) {
    throw new BaseError(errors.USER_DOES_NOT_EXIST, 400);
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
  const { userHandle, userEmailAddress, userPassword } = ctx.request
    .body as UserAttributes;

  /**
   * Support for logging in via email and username.
   */

  const loginOptions = userHandle
    ? { userHandle: userHandle }
    : { userEmailAddress: userEmailAddress };

  const existingUser = await User.findOne({
    where: { ...loginOptions },
  });

  if (!existingUser) throw new BaseError(errors.USER_DOES_NOT_EXIST, 400);

  const correctPassword = await existingUser.validatePassword(userPassword);

  if (!correctPassword) {
    throw new BaseError(errors.BAD_CREDENTIALS, 400);
  }

  const token = createToken(existingUser.userHandle);

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
  const { userHandle, userPassword } = ctx.request.body as UserAttributes;

  const existingUser = await User.findOne({
    where: { userHandle },
  });

  if (!existingUser) {
    ctx.response.status = 400;
    return;
  }

  const correctPassword = await existingUser.validatePassword(userPassword);

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
