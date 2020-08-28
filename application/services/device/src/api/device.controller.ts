import { DefaultContext } from 'koa';

import { Device } from '../models/Device';

/**
 * Create device...
 */

const create = async (ctx: DefaultContext): Promise<void> => {
  const { name, description, latitude, longitude, type } = ctx.request.body;

  const currentUser = ctx.state.user.id;

  const newDevice = Device.build({
    owner: currentUser,
    name,
    description,
    latitude,
    longitude,
    type,
  });

  const device = await newDevice.save().then((device) => device);

  ctx.body = {
    status: 'success',
    data: { device },
  };
};

/**
 * Modify device...
 */

const modify = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingDevice = await Device.findOne({
    where: { id },
  });

  if (!existingDevice) {
    throw new Error('Device you are trying to modify does not exist!');
  }

  if (!existingDevice.isActive)
    throw new Error(
      'This device is disabled, if you want to enable you device please visit dashboard page!',
    );

  const currentUser = ctx.state.user.id;

  if (currentUser !== existingDevice.owner)
    throw new Error('You are not allowed to do this!');

  const { name, description, latitude, longitude, type } = ctx.request.body;

  existingDevice.update({ name, description, latitude, longitude, type });

  const device = await existingDevice.save().then((device) => device);

  ctx.body = {
    status: 'success',
    data: { device },
  };
};

/**
 * Disable device...
 */

const disable = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingDevice = await Device.findOne({
    where: { id },
  });

  if (!existingDevice) {
    throw new Error('Cannot disable device that does not exist!');
  }

  const currentUser = ctx.state.user.id;

  if (currentUser !== existingDevice.owner)
    throw new Error('You are not allowed to do this!');

  existingDevice.set('isActive', false);

  await existingDevice.save();

  ctx.body = {
    status: 'success',
    data: {},
  };
};

/**
 * Get one device...
 */

const getOne = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingDevice = await Device.findOne({ where: { id } });

  if (!existingDevice) {
    throw new Error('Device does not exist!');
  }

  if (!existingDevice.isActive)
    throw new Error(
      'This device is disabled, if you want to enable you device please visit dashboard page!',
    );

  const currentUser = ctx.state.user.id;

  if (currentUser !== existingDevice.owner)
    throw new Error('You are not allowed to do this!');

  ctx.body = {
    status: 'success',
    data: { device: existingDevice },
  };
};

/**
 * Get all devices...
 */

const getAll = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.state.user;

  const devices = await Device.findAll({ where: { owner: id } });

  if (!devices) {
    throw new Error('Device does not exist');
  }

  ctx.body = {
    status: 'success',
    data: { devices },
  };
};

export { create, modify, disable, getOne, getAll };
