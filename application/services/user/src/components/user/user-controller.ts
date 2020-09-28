import { DefaultContext } from 'koa';
import { validate } from 'class-validator';

import { User } from './user-model';
import { logger } from '../../utils/logger';
import { createToken } from '../../middlewares/jwt-middleware';
import { UserAttributes } from './user-types';
import { BaseError } from '../../errors/base-error';
import {
  USER_ALREADY_EXIST,
  USER_DOES_NOT_EXIST,
  BAD_CREDENTIALS,
} from './user-errors';

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

  /**
   * Fail very fast in case of bad input
   */

  const validateResult = await validate(
    { userHandle, userFirstName, userLastName, userEmailAddress, userPassword },
    {
      forbidUnknownValues: true,
      validationError: { target: false, value: false },
    },
  );

  if (validateResult.length > 0) {
  }

  const existingUser = await User.findOne({
    where: [{ userHandle }, { userEmailAddress }],
  });

  if (existingUser) throw new BaseError(USER_ALREADY_EXIST, 400);

  const newUser = User.create({
    userHandle,
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  });

  const user = await User.save(newUser);

  const token = createToken(user.userUniqueIndentifier);

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
  const userUniqueIndentifier = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { userUniqueIndentifier },
  });

  if (!existingUser) throw new BaseError(USER_DOES_NOT_EXIST, 400);

  const {
    userHandle,
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  } = ctx.request.body as UserAttributes;

  const alreadyUsedProperty = await User.findOne({
    where: [{ userHandle }, { userEmailAddress }],
  });

  if (alreadyUsedProperty) throw new BaseError(USER_ALREADY_EXIST, 400);

  const modifiedUser = User.merge(existingUser, {
    userHandle,
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
  const userUniqueIndentifier = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { userUniqueIndentifier },
  });

  if (!existingUser) throw new BaseError(USER_DOES_NOT_EXIST, 400);

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
  const userUniqueIndentifier = ctx.state.user.id;

  const user = User.findOne({ where: { userUniqueIndentifier } });

  if (!user) {
    throw new BaseError(USER_DOES_NOT_EXIST, 400);
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

  if (!existingUser) throw new BaseError(USER_DOES_NOT_EXIST, 400);

  const correctPassword = await existingUser.validatePassword(userPassword);

  if (!correctPassword) {
    throw new BaseError(BAD_CREDENTIALS, 400);
  }

  const token = createToken(existingUser.userUniqueIndentifier);

  ctx.session = { token };

  Object.assign(existingUser, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully logged in.',
    data: existingUser,
  };

  logger.info(
    `User: ${existingUser.userUniqueIndentifier} successfully logged in.`,
  );
};

/**
 * Logout user
 */

const logUserOut = async (ctx: DefaultContext): Promise<void> => {
  const userUniqueIndentifier = ctx.state.user.id;

  ctx.session = null;

  ctx.body = {
    status: 'success',
    message: 'You have successfully logged out.',
  };

  logger.info(`User: ${userUniqueIndentifier} successfully logged out.`);
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
