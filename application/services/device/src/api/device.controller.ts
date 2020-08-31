import { DefaultContext } from 'koa';

import { Device } from '../models/Device';
import { logger } from '../utils/logger';

/**
 * Create device...
 */

const create = async (ctx: DefaultContext): Promise<void> => {
  const { name, description, topic } = ctx.request.body;

  const { id } = ctx.state.user;

  console.log(id);

  const newDevice = Device.build({
    owner: id,
    name,
    description,
    topic,
  });

  const device = await newDevice.save().then((device) => device);

  ctx.body = {
    status: 'success',
    data: { device },
  };

  logger.info(`Device: ${device.id} successfully created.`);
};

/**
 * Modify device...
 */

const modify = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingDevice = await Device.findOne({
    where: { id },
  });

  if (!existingDevice) throw new Error('Device does not exist!');

  const currentUser = ctx.state.user.id;

  if (currentUser !== existingDevice.owner)
    throw new Error('You have no permision to perform that action!');

  const { name, description } = ctx.request.body;

  existingDevice.update({ name, description });

  const device = await existingDevice.save().then((device) => device);

  ctx.body = {
    status: 'success',
    data: { device },
  };

  logger.info(`Device: ${device.id} data successfully modified.`);
};

/**
 * Remove device...
 */

const remove = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingDevice = await Device.findOne({
    where: { id },
  });

  if (!existingDevice) throw new Error('Device does not exist!');

  const currentUser = ctx.state.user.id;

  if (currentUser !== existingDevice.owner)
    throw new Error('You have no permision to perform that action!');

  existingDevice.destroy();

  await existingDevice.save();

  ctx.body = {
    status: 'success',
    data: {},
  };

  logger.info(`Device: ${existingDevice.id} successfully removed.`);
};

/**
 * Get one device...
 */

const one = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const existingDevice = await Device.findOne({
    where: { id },
  });

  if (!existingDevice) throw new Error('Device does not exist!');

  const currentUser = ctx.state.user.id;

  if (currentUser !== existingDevice.owner)
    throw new Error('You have no permision to perform that action!');

  ctx.body = {
    status: 'success',
    data: { device: existingDevice },
  };
};

/**
 * Get all devices...
 */

const all = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.state.user;

  const devices = await Device.findAll({
    where: { owner: id },
  });

  ctx.body = {
    status: 'success',
    data: { devices },
  };
};

/**
 * MQTT acl route...
 */

const acl = async (ctx: DefaultContext): Promise<void> => {
  const { clientid, topic } = ctx.request.body;

  console.log(ctx.request.body);

  const existingDevice = await Device.findOne({
    where: { id: clientid },
  });

  if (!existingDevice) {
    ctx.response.status = 400;
    return;
  }

  if (existingDevice?.topic !== topic) {
    ctx.response.status = 400;
    return;
  }

  ctx.response.status = 200;
};

export { create, modify, remove, one, all, acl };
