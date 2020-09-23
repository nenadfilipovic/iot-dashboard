import { DefaultContext } from 'koa';

import { Device } from '../models/Device';
import { logger } from '../utils/logger';
import { BadRequestError } from '../errors/BadRequestError';

/**
 * Register device...
 */

const registerDevice = async (ctx: DefaultContext): Promise<void> => {
  try {
    const {
      deviceName,
      deviceChannel,
      deviceDescription,
      deviceType,
    } = ctx.request.body;

    const loggedInUser = ctx.state.user;

    const newDevice = Device.build({
      deviceOwner: loggedInUser.id,
      deviceName,
      deviceDescription,
      deviceChannel,
      deviceType,
    });

    const device = await newDevice.save().then((device) => device);

    ctx.body = {
      status: 'success',
      data: { device },
    };

    logger.info(
      `Device: ${device.deviceUniqueIndentifier} successfully created.`,
    );
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * Modify device...
 */

const modifyDevice = async (ctx: DefaultContext): Promise<void> => {
  try {
    const { id } = ctx.request.params;

    const existingDevice = await Device.findOne({
      where: { deviceUniqueIndentifier: id },
    });

    if (!existingDevice) throw new Error('Device does not exist!');

    const loggedInUser = ctx.state.user;

    if (loggedInUser.id !== existingDevice.deviceOwner)
      throw new Error('You have no permision to perform that action!');

    const {
      deviceName,
      deviceDescription,
      deviceChannel,
      deviceType,
    } = ctx.request.body;

    existingDevice.update({
      deviceName,
      deviceDescription,
      deviceChannel,
      deviceType,
    });

    const device = await existingDevice.save().then((device) => device);

    ctx.body = {
      status: 'success',
      data: { device },
    };

    logger.info(
      `Device: ${device.deviceUniqueIndentifier} data successfully modified.`,
    );
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * Remove device...
 */

const removeDevice = async (ctx: DefaultContext): Promise<void> => {
  try {
    const { id } = ctx.request.params;

    const existingDevice = await Device.findOne({
      where: { deviceUniqueIndentifier: id },
    });

    if (!existingDevice) throw new Error('Device does not exist!');

    const loggedInUser = ctx.state.user;

    if (loggedInUser.id !== existingDevice.deviceOwner)
      throw new Error('You have no permision to perform that action!');

    existingDevice.destroy();

    await existingDevice.save();

    ctx.body = {
      status: 'success',
      data: {},
    };

    logger.info(
      `Device: ${existingDevice.deviceUniqueIndentifier} successfully removed.`,
    );
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * Get single device...
 */

const getSingleDevice = async (ctx: DefaultContext): Promise<void> => {
  try {
    const { id } = ctx.request.params;

    const existingDevice = await Device.findOne({
      where: { deviceUniqueIndentifier: id },
    });

    if (!existingDevice) throw new Error('Device does not exist!');

    const loggedInUser = ctx.state.user;

    if (loggedInUser.id !== existingDevice.deviceOwner)
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

const getAllDevices = async (ctx: DefaultContext): Promise<void> => {
  try {
    const loggedInUser = ctx.state.user;

    const devices = await Device.findAll({
      where: { deviceOwner: loggedInUser.id },
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

const mqttAcl = async (ctx: DefaultContext): Promise<void> => {
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

  if (existingDevice?.deviceChannel !== topic) {
    ctx.response.status = 400;
    return;
  }

  ctx.response.status = 200;
};

export {
  registerDevice,
  modifyDevice,
  removeDevice,
  getSingleDevice,
  getAllDevices,
  mqttAcl,
};
