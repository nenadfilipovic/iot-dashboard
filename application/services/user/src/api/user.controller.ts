import { DefaultContext } from 'koa';

import { User } from '../models/User';
import { createToken } from '../services/jwt';

/**
 * Create user...
 */

const create = async (ctx: DefaultContext): Promise<void> => {
  const {
    name,
    lastName,
    email,
    password,
    latitude,
    longitude,
  } = ctx.request.body;

  const newUser = User.build({
    name,
    lastName,
    email,
    password,
    latitude,
    longitude,
  });

  const user = await newUser.save().then((user) => user);

  Object.assign(user, { password: undefined });

  const token = createToken(user.id);

  ctx.session = { token };

  ctx.body = {
    status: 'success',
    data: { user },
  };
};

/**
 * Modify user...
 */

const modify = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingUser = await User.findOne({
    where: { id, isActive: true },
  });

  if (!existingUser)
    throw new Error('Cannot modify user that is disabled or does not exist!');

  const currentUser = ctx.state.user.id;

  if (currentUser !== id) throw new Error('You are not allowed to do this!');

  const {
    name,
    lastName,
    email,
    password,
    latitude,
    longitude,
  } = ctx.request.body;

  existingUser.update({ name, lastName, email, password, latitude, longitude });

  const user = await existingUser.save().then((user) => user);

  Object.assign(user, { password: undefined });

  ctx.body = {
    status: 'success',
    data: { user },
  };
};

/**
 * Disable user...
 */

const disable = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingUser = await User.findOne({
    where: { id, isActive: true },
  });

  if (!existingUser)
    throw new Error(
      'Cannot disable user that is already disabled or does not exist!',
    );

  const currentUser = ctx.state.user.id;

  if (currentUser !== id) throw new Error('You are not allowed to do this!');

  existingUser.set('isActive', false);

  await existingUser.save();

  ctx.session = null;

  ctx.body = {
    status: 'success',
    data: {},
  };
};

/**
 * Get one user...
 */

const getOne = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingUser = await User.findOne({
    where: { id, isActive: true },
    attributes: { exclude: ['password'] },
  });

  if (!existingUser)
    throw new Error('Cannot display user that is disabled or does not exist!');

  const currentUser = ctx.state.user.id;

  if (currentUser !== id) throw new Error('You are not allowed to do this!');

  ctx.body = {
    status: 'success',
    data: { user: existingUser },
  };
};

export { create, modify, disable, getOne };
