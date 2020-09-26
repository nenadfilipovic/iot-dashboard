import { DefaultContext } from 'koa';
import { validate } from 'class-validator';

import { User } from '../models/User';
import { logger } from '../utils/logger';
import { createToken } from '../services/jwt';
import { BadRequestError } from '../errors/badRequest';
import { UserAttributes } from '../types';

/**
 * Register user...
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

  if (existingUser)
    throw new BadRequestError(
      'Provided email or user handle is already in use!',
    );

  const newUser = User.create({
    userHandle,
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  });

  const validateResult = await validate(newUser, {
    forbidUnknownValues: true,
    validationError: { target: false, value: false },
  });

  if (validateResult.length > 0) {
  }

  await User.save(newUser).then((user) => {
    const token = createToken(user.userUniqueIndentifier);
    ctx.session = { token };
    Object.assign(user, { userPassword: undefined });
    ctx.body = {
      status: 'success',
      message: 'You have successfully registered new account',
      data: user,
    };
    logger.info(`User: ${user.userUniqueIndentifier} successfully registered`);
  });
};

/**
 * Modify user...
 */

const modifyUser = async (ctx: DefaultContext): Promise<void> => {
  const userUniqueIndentifier = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { userUniqueIndentifier },
  });

  if (!existingUser) throw new BadRequestError('User does not exist!');

  const {
    userHandle,
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  } = ctx.request.body as UserAttributes;

  const modifiedUser = User.merge(existingUser, {
    userHandle,
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  });

  await User.save(modifiedUser).then((user) => {
    Object.assign(user, { userPassword: undefined });
    ctx.body = {
      status: 'success',
      message: 'You have successfully updated your data',
      data: user,
    };
    logger.info(
      `User: ${user.userUniqueIndentifier} data successfully modified`,
    );
  });
};

/**
 * Delete user...
 */

const removeUser = async (ctx: DefaultContext): Promise<void> => {
  const userUniqueIndentifier = ctx.state.user.id;

  const existingUser = await User.findOne({
    where: { userUniqueIndentifier },
  });

  if (!existingUser) throw new BadRequestError('User does not exist!');

  await User.delete(existingUser);

  ctx.session = null;

  ctx.body = {
    status: 'success',
    message: 'You have successfully deleted your account',
  };

  logger.info(
    `User: ${existingUser.userUniqueIndentifier} successfully removed`,
  );
};

/**
 * Get current user...
 */

const getCurrentUser = async (ctx: DefaultContext): Promise<void> => {
  const userUniqueIndentifier = ctx.state.user.id;

  await User.findOne({
    where: { userUniqueIndentifier },
  })
    .then((user) => {
      Object.assign(user, { userPassword: undefined });
      ctx.body = {
        status: 'success',
        message: 'You have successfully retrieved your account data',
        data: user,
      };
    })
    .catch(() => {
      throw new BadRequestError('User does not exist!');
    });
};

/**
 * Login user...
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

  if (!existingUser) throw new BadRequestError('User does not exist!');

  const correctPassword = await existingUser.validatePassword(userPassword);

  if (!correctPassword)
    throw new BadRequestError('Bad credentials, please try again!');

  const token = createToken(existingUser.userUniqueIndentifier);

  ctx.session = { token };

  Object.assign(existingUser, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully logged in',
    data: existingUser,
  };

  logger.info(
    `User: ${existingUser.userUniqueIndentifier} successfully logged in`,
  );
};

/**
 * Logout user...
 */

const logUserOut = async (ctx: DefaultContext): Promise<void> => {
  const userUniqueIndentifier = ctx.state.user.id;

  ctx.session = null;

  ctx.body = {
    status: 'success',
    message: 'You have successfully logged out',
  };

  logger.info(`User: ${userUniqueIndentifier} successfully logged out`);
};

/**
 * MQTT auth route...
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
