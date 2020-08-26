import { DefaultContext } from 'koa';

import { User } from '../models/User';
import { createToken } from '../services/jwt';

const create = async (ctx: DefaultContext): Promise<void> => {
  const { name, lastName, email, password, location } = ctx.request.body;

  const newUser = User.build({
    name,
    lastName,
    email,
    password,
    location,
  });

  const user = await newUser.save().then((user) => user);

  const token = createToken(user.userId);

  ctx.session = {
    jwt: token,
  };

  Object.assign(user, { password: undefined });

  ctx.body = {
    status: 'success',
    data: { user },
  };
};

const modify = async (ctx: DefaultContext): Promise<void> => {
  const id = ctx.request.params.id;

  const existingUser = await User.findOne({ where: { userId: id } });

  if (!existingUser) throw new Error('Cannot modify user that does not exist!');

  if (!existingUser.active)
    throw new Error(
      'This user is disabled, if you want to enable you account please visit login page!',
    );

  const { name, lastName, email, password, location } = ctx.request.body;

  existingUser.update({ name, lastName, email, password, location });

  const user = await existingUser.save().then((user) => user);

  // remove password

  ctx.body = {
    status: 'success',
    data: { user },
  };
};

const disable = async (ctx: DefaultContext): Promise<void> => {
  const id = ctx.request.params.id;

  const existingUser = await User.findOne({ where: { userId: id } });

  if (!existingUser)
    throw new Error('Cannot disable user that does not exist!');

  existingUser.set('active', false);

  await existingUser.save();

  // should probably destroy session

  ctx.body = {
    status: 'success',
    data: {},
  };
};

const getOne = async (ctx: DefaultContext): Promise<void> => {
  const id = ctx.request.params.id;

  const existingUser = await User.findOne({
    where: { userId: id },
  });

  if (!existingUser) throw new Error('User does not exist!');

  if (!existingUser.active)
    throw new Error(
      'This user is disabled, if you want to enable you account please visit login page!',
    );

  // dont return password

  ctx.body = {
    status: 'success',
    data: { user: existingUser },
  };
};

export { create, modify, disable, getOne };
