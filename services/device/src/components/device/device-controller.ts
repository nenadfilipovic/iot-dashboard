import { DefaultContext } from 'koa';
import { Message } from 'amqp-ts';

import { Device } from './device-model';
import { appLogger } from '../../utils/logger';
import { BaseError } from '../../errors/base-error';
import { DeviceAttributes } from './device-types';
import { Errors } from './device-errors';
import { deviceRemovedPublisher } from '../../event-bus/publishers';

/**
 * Register device
 */

const registerDevice = async (ctx: DefaultContext): Promise<void> => {
  const { deviceName, deviceChannel, deviceDescription, deviceType } = ctx
    .request.body as DeviceAttributes;

  const existingDevice = await Device.findOne({ where: { deviceChannel } });

  if (existingDevice) {
    throw new BaseError(Errors.CHANNEL_USED, 400);
  }

  const deviceOwner = ctx.state.user.id;

  const newDevice = Device.create({
    deviceOwner,
    deviceName,
    deviceDescription,
    deviceChannel,
    deviceType,
  });

  const device = await Device.save(newDevice);

  ctx.body = {
    status: 'success',
    message: 'You have successfully registered new device.',
    data: device,
  };

  appLogger.info(
    `Device: ${device.deviceUniqueIndentifier} successfully created.`,
  );
};

/**
 * Modify device
 */

const modifyDevice = async (ctx: DefaultContext): Promise<void> => {
  const deviceChannel = ctx.request.params.id;

  const existingDevice = await Device.findOne({
    where: { deviceChannel },
  });

  if (!existingDevice) throw new BaseError(Errors.DOES_NOT_EXIST, 400);

  const deviceOwner = ctx.state.user.id;

  if (deviceOwner !== existingDevice.deviceOwner) {
    throw new BaseError(Errors.NO_PERMISION, 403);
  }

  const { deviceName, deviceDescription, deviceType } = ctx.request
    .body as DeviceAttributes;

  const modifiedDevice = Device.merge(existingDevice, {
    deviceName,
    deviceDescription,
    deviceType,
  });

  const device = await Device.save(modifiedDevice);

  ctx.body = {
    status: 'success',
    message: 'You have successfully updated your device.',
    data: device,
  };

  appLogger.info(
    `Device: ${device.deviceUniqueIndentifier} data successfully modified.`,
  );
};

/**
 * Remove device
 */

const removeDevice = async (ctx: DefaultContext): Promise<void> => {
  const deviceChannel = ctx.request.params.id;

  const existingDevice = await Device.findOne({
    where: { deviceChannel },
  });

  if (!existingDevice) throw new BaseError(Errors.DOES_NOT_EXIST, 400);

  const deviceOwner = ctx.state.user.id;

  if (deviceOwner !== existingDevice.deviceOwner) {
    throw new BaseError(Errors.NO_PERMISION, 403);
  }

  await Device.delete(existingDevice.deviceUniqueIndentifier);

  ctx.body = {
    status: 'success',
    message: 'You have successfully deleted your device.',
  };

  appLogger.info(
    `Device: ${existingDevice.deviceUniqueIndentifier} successfully removed.`,
  );

  /**
   * This action will remove only logs
   * from this device,
   * we need to send device owner
   * so it can find correct measurement
   * and device channel so it knows which
   * series to remove
   */

  deviceRemovedPublisher({ deviceOwner, deviceChannel });
};

/**
 * Delete all devices user owns after
 * he disables his account
 */

const removeDeviceOnRemoveUser = async (payload: Message): Promise<void> => {
  try {
    const deviceOwner = payload.getContent() as string;
    await Device.delete({ deviceOwner });
    payload.ack();
  } catch {
    payload.nack();
  }
};

/**
 * Get single device
 */

const getSingleDevice = async (ctx: DefaultContext): Promise<void> => {
  const deviceChannel = ctx.request.params.id;

  const existingDevice = await Device.findOne({
    where: { deviceChannel },
  });

  if (!existingDevice) throw new BaseError(Errors.DOES_NOT_EXIST, 400);

  const deviceOwner = ctx.state.user.id;

  if (deviceOwner !== existingDevice.deviceOwner) {
    throw new BaseError(Errors.NO_PERMISION, 403);
  }

  ctx.body = {
    status: 'success',
    message: 'You have successfully retrieved your device data.',
    data: existingDevice,
  };
};

/**
 * Get all devices
 */

const getAllDevices = async (ctx: DefaultContext): Promise<void> => {
  const deviceOwner = ctx.state.user.id;

  const devices = await Device.find({
    where: { deviceOwner },
  });

  ctx.body = {
    status: 'success',
    message: 'You have successfully retrieved all your devices.',
    data: devices,
  };
};

/**
 * Mqtt acl route
 */

const mqttAcl = async (ctx: DefaultContext): Promise<void> => {
  const { deviceOwner, deviceChannel, deviceTopic } = ctx.request.body;

  if (deviceOwner === 'admin') {
    ctx.response.status = 200;
    ctx.body = 'ignore';
    return;
  }

  const existingDevice = await Device.findOne({
    where: { deviceOwner, deviceChannel },
  });

  if (!existingDevice || existingDevice.deviceTopic !== deviceTopic) {
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