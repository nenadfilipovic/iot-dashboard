import { DefaultContext } from 'koa';

import { User } from '../models/User';
import { logger } from '../utils/logger';
import { createToken } from '../services/jwt';
import { BadRequestError } from '../errors/badRequest';

/**
 * Register user...
 */

const registerUser = async (ctx: DefaultContext): Promise<void> => {
  const {
    userFirstName,
    userLastName,
    userHandle,
    userEmailAddress,
    userPassword,
  } = ctx.request.body;

  const existingUser = await User.findOne({
    where: { userEmailAddress },
  });

  if (existingUser)
    throw new BadRequestError('Provided email is already in use!');

  const handleAlreadyUsed = await User.findOne({
    where: { userHandle },
  });

  if (handleAlreadyUsed)
    throw new BadRequestError('Provided handle is already in use!');

  const newUser = User.build({
    userFirstName,
    userLastName,
    userHandle,
    userEmailAddress,
    userPassword,
  });

  const user = await newUser.save().then((user) => user);

  const token = createToken(user.userUniqueIndentifier);

  ctx.session = { token };

  Object.assign(user, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully registered',
    data: user,
  };

  logger.info(`User: ${user.userUniqueIndentifier} successfully registered`);
};

/**
 * Modify user...
 */

const modifyUser = async (ctx: DefaultContext): Promise<void> => {
  const loggedInUser = ctx.state.user;

  const existingUser = await User.findOne({
    where: { userUniqueIndentifier: loggedInUser.id },
  });

  if (!existingUser) throw new BadRequestError('User does not exist!');

  const {
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  } = ctx.request.body;

  existingUser.update({
    userFirstName,
    userLastName,
    userEmailAddress,
    userPassword,
  });

  const user = await existingUser.save().then((user) => user);

  Object.assign(user, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully updated your data',
    data: user,
  };

  logger.info(`User: ${user.userUniqueIndentifier} data successfully modified`);
};

/**
 * Delete user...
 */

const removeUser = async (ctx: DefaultContext): Promise<void> => {
  const loggedInUser = ctx.state.user;

  const existingUser = await User.findOne({
    where: { userUniqueIndentifier: loggedInUser.id },
  });

  if (!existingUser) throw new BadRequestError('User does not exist!');

  existingUser.destroy();

  await existingUser.save();

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
  const loggedInUser = ctx.state.user;

  const existingUser = await User.findOne({
    where: { userUniqueIndentifier: loggedInUser.id },
  });

  if (!existingUser) throw new BadRequestError('User does not exist!');

  Object.assign(existingUser, { userPassword: undefined });

  ctx.body = {
    status: 'success',
    message: 'You have successfully retrieved your account data',
    data: existingUser,
  };
};

/**
 * Login user...
 */

const logUserIn = async (ctx: DefaultContext): Promise<void> => {
  const { userHandle, userEmailAddress, userPassword } = ctx.request.body;

  /**
   * Support for logging in via email and username.
   */

  const loginOptions = userHandle
    ? { userHandle: userHandle }
    : { userEmailAddress: userEmailAddress };

  const existingUser = await User.findOne({
    where: { ...loginOptions },
    attributes: { include: ['userPassword'] },
  });

  if (!existingUser) throw new BadRequestError('User does not exist!');

  const correctPassword = await existingUser.passwordValidator(userPassword);

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
  const loggedInUser = ctx.state.user;

  ctx.session = null;

  ctx.body = {
    status: 'success',
    message: 'You have successfully logged out',
  };

  logger.info(`User: ${loggedInUser.id} successfully logged out`);
};

/**
 * MQTT auth route...  TODO - Fix mqtt auth route
 */

const mqttAuth = async (ctx: DefaultContext): Promise<void> => {
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

  const correctPassword = await existingUser.passwordValidator(password);

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
