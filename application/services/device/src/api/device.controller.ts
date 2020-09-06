import { DefaultContext } from 'koa';

import { Device } from '../models/Device';
import { logger } from '../utils/logger';
import {BadRequestError} from "../errors/BadRequestError"

/**
 * Create device...
 */

const create = async (ctx: DefaultContext): Promise<void> => {
  try {
    const { name, description, topic } = ctx.request.body;

    const loggedInUser = ctx.state.user;
  
    const newDevice = Device.build({
      user: loggedInUser.id,
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
  } catch (error) {
    throw new BadRequestError(error.message);
  }
  
};

/**
 * Modify device...
 */

const modify = async (ctx: DefaultContext): Promise<void> => {
  try {
    const { id } = ctx.request.params;

    const existingDevice = await Device.findOne({
      where: { id },
    });
  
    if (!existingDevice) throw new Error('Device does not exist!');
  
    const loggedInUser = ctx.state.user;
  
    if (loggedInUser.id !== existingDevice.user)
      throw new Error('You have no permision to perform that action!');
  
    const { name, description, topic } = ctx.request.body;
  
    existingDevice.update({ name, description, topic });
  
    const device = await existingDevice.save().then((device) => device);
  
    ctx.body = {
      status: 'success',
      data: { device },
    };
  
    logger.info(`Device: ${device.id} data successfully modified.`);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
  
};

/**
 * Remove device...
 */

const remove = async (ctx: DefaultContext): Promise<void> => {
  try {
    const { id } = ctx.request.params;

    const existingDevice = await Device.findOne({
      where: { id },
    });
  
    if (!existingDevice) throw new Error('Device does not exist!');
  
    const loggedInUser = ctx.state.user;
  
    if (loggedInUser.id !== existingDevice.user)
      throw new Error('You have no permision to perform that action!');
  
    existingDevice.destroy();
  
    await existingDevice.save();
  
    ctx.body = {
      status: 'success',
      data: {},
    };
  
    logger.info(`Device: ${existingDevice.id} successfully removed.`);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
  
};

/**
 * Get one device...
 */

const one = async (ctx: DefaultContext): Promise<void> => {
  try {
    const { id } = ctx.request.params;

    const existingDevice = await Device.findOne({
      where: { id },
    });
  
    if (!existingDevice) throw new Error('Device does not exist!');
  
    const loggedInUser = ctx.state.user;
  
    if (loggedInUser.id !== existingDevice.user)
      throw new Error('You have no permision to perform that action!');
  
    ctx.body = {
      status: 'success',
      data: { device: existingDevice },
    };
  } catch (error) {
    throw new BadRequestError(error.message);
  }
  
};

/**
 * Get all devices...
 */

const all = async (ctx: DefaultContext): Promise<void> => {
  try {
    const loggedInUser = ctx.state.user;

    const devices = await Device.findAll({
      where: { user: loggedInUser.id },
    });
  
    ctx.body = {
      status: 'success',
      data: { devices },
    };
  } catch (error) {
    throw new BadRequestError(error.message);
  }
  
};

/**
 * MQTT acl route...
 */

const acl = async (ctx: DefaultContext): Promise<void> => {
  const { username: user, clientid: name, topic } = ctx.request.body;

  if (user === 'admin') {
    ctx.response.status = 200;
    return;
  }

  const existingDevice = await Device.findOne({
    where: { name },
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
