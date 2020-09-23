import { DefaultContext } from 'koa';

import { User } from '../models/User';
import { logger } from '../utils/logger';
import { createToken } from '../services/jwt';
import { BadRequestError } from '../errors/BadRequestError';

/**
 * Register user...
 */

const registerUser = async (ctx: DefaultContext): Promise<void> => {
  try {
    const {
      userFirstName,
      userLastName,
      userHandle,
      userEmailAddress,
      userPassword,
    } = ctx.request.body;

    const newUser = User.build({
      userFirstName,
      userLastName,
      userHandle,
      userEmailAddress,
      userPassword,
    });

    const user = await newUser.save().then((user) => user);

    const token = createToken(user.id);

    ctx.session = { token };

    Object.assign(user, { userPassword: undefined });

    ctx.body = {
      status: 'success',
      data: { user },
    };

    logger.info(`User: ${user.id} successfully registered.`);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * Modify user...
 */

const modifyUser = async (ctx: DefaultContext): Promise<void> => {
  try {
    const loggedInUser = ctx.state.user;

    const existingUser = await User.findOne({
      where: { id: loggedInUser.id },
    });

    if (!existingUser) throw new Error('User does not exist!');

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
      data: { user },
    };

    logger.info(`User: ${user.id} data successfully modified.`);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * Delete user...
 */

const removeUser = async (ctx: DefaultContext): Promise<void> => {
  try {
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
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * Get current user...
 */

const getCurrentUser = async (ctx: DefaultContext): Promise<void> => {
  try {
    const loggedInUser = ctx.state.user;

    const existingUser = await User.findOne({
      where: { id: loggedInUser.id },
    });

    if (!existingUser) throw new Error('User does not exist!');

    Object.assign(existingUser, { userPassword: undefined });

    ctx.body = {
      status: 'success',
      data: { user: existingUser },
    };
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * Login user...
 */

const logUserIn = async (ctx: DefaultContext): Promise<void> => {
  try {
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

    if (!existingUser) throw new Error('User does not exist!');

    const correctPassword = await existingUser.passwordValidator(userPassword);

    if (!correctPassword) throw new Error('Bad credentials, please try again!');

    const token = createToken(existingUser.id);

    ctx.session = { token };

    Object.assign(existingUser, { userPassword: undefined });

    ctx.body = {
      status: 'success',
      data: { user: existingUser },
    };

    logger.info(`User: ${existingUser.id} successfully logged in.`);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * Logout user...
 */

const logUserOut = async (ctx: DefaultContext): Promise<void> => {
  try {
    const loggedInUser = ctx.state.user;

    ctx.session = null;
    ctx.body = {};

    logger.info(`User: ${loggedInUser.id} successfully logged out.`);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * MQTT auth route...
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
