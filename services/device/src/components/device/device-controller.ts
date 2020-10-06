import { DefaultContext } from 'koa';
import { Message } from 'amqp-ts';

import { Device } from './device-model';
import { appLogger } from '../../utils/logger';
import { BaseError } from '../../errors/base-error';
import { DeviceAttributes } from './device-types';
import { Errors } from './device-errors';
import { deviceRemovedPublisher } from '../../event-bus/publishers';
import { modifySchema, registerSchema } from './device-validation';

/**
 * Register device
 */

const registerDevice = async (ctx: DefaultContext): Promise<void> => {
  await registerSchema.validateAsync({
    ...ctx.request.body,
  });

  const owner = ctx.state.user.id;

  const newDevice = Device.create({
    ...(ctx.request.body as DeviceAttributes),
    owner: owner,
  });

  const device = await Device.save(newDevice);

  ctx.body = {
    status: 'success',
    data: { device },
  };
};

/**
 * Modify device
 */

const modifyDevice = async (ctx: DefaultContext): Promise<void> => {
  await modifySchema.validateAsync({
    ...ctx.request.body,
  });

  const channel = ctx.request.params.id;

  const existingDevice = await Device.findOne({
    where: { channel },
  });

  if (!existingDevice) throw new BaseError(Errors.DOES_NOT_EXIST, 400);

  const owner = ctx.state.user.id;

  if (owner !== existingDevice.owner) {
    throw new BaseError(Errors.NO_PERMISION, 403);
  }

  const modifiedDevice = Device.merge(existingDevice, {
    ...(ctx.request.body as DeviceAttributes),
  });

  const device = await Device.save(modifiedDevice);

  ctx.body = {
    status: 'success',
    data: { device },
  };
};

/**
 * Remove device
 */

const removeDevice = async (ctx: DefaultContext): Promise<void> => {
  const channel = ctx.request.params.id;

  const existingDevice = await Device.findOne({
    where: { channel },
  });

  if (!existingDevice) throw new BaseError(Errors.DOES_NOT_EXIST, 400);

  const owner = ctx.state.user.id;

  if (owner !== existingDevice.owner) {
    throw new BaseError(Errors.NO_PERMISION, 403);
  }

  await Device.delete(existingDevice.id);

  ctx.body = {
    status: 'success',
    data: null,
  };

  appLogger.info(`Device: ${existingDevice.id} successfully removed.`);

  /**
   * This action will remove only logs
   * from this device,
   * we need to send device owner
   * so it can find correct measurement
   * and device channel so it knows which
   * series to remove
   */

  deviceRemovedPublisher({ owner, channel });
};

/**
 * Delete all devices user owns after
 * he disables his account
 */

const removeDeviceOnRemoveUser = async (payload: Message): Promise<void> => {
  try {
    const owner = payload.getContent() as string;
    await Device.delete({ owner });
    payload.ack();
  } catch {
    payload.nack();
  }
};

/**
 * Get single device
 */

const getSingleDevice = async (ctx: DefaultContext): Promise<void> => {
  const channel = ctx.request.params.id;

  const device = await Device.findOne({
    where: { channel },
  });

  if (!device) throw new BaseError(Errors.DOES_NOT_EXIST, 400);

  const owner = ctx.state.user.id;

  if (owner !== device.owner) {
    throw new BaseError(Errors.NO_PERMISION, 403);
  }

  ctx.body = {
    status: 'success',
    data: { device },
  };
};

/**
 * Get all devices
 */

const getAllDevices = async (ctx: DefaultContext): Promise<void> => {
  const owner = ctx.state.user.id;

  const devices = await Device.find({
    where: { owner },
  });

  ctx.body = {
    status: 'success',
    data: { devices },
  };
};

/**
 * Mqtt acl route
 */

const mqttAcl = async (ctx: DefaultContext): Promise<void> => {
  const { owner, channel, topic } = ctx.request.body;

  if (owner === 'admin') {
    ctx.response.status = 200;
    ctx.body = 'ignore';
    return;
  }

  const existingDevice = await Device.findOne({
    where: { owner, channel },
  });

  if (!existingDevice || existingDevice.topic !== topic) {
    ctx.response.status = 400;
    return;
  }

  ctx.response.status = 200;
  return;
};

export {
  registerDevice,
  modifyDevice,
  removeDevice,
  removeDeviceOnRemoveUser,
  getSingleDevice,
  getAllDevices,
  mqttAcl,
};
