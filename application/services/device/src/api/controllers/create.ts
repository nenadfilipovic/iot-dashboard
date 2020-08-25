import { DefaultContext } from 'koa';
import { v4 as uuidv4 } from 'uuid';

import { createDevice } from '../../services/schemas';
import { ValidationError } from '../../errors/validation';
import { Device } from '../models/Device';

const create = async (ctx: DefaultContext): Promise<void> => {
  const {
    userId,
    name,
    description,
    locationLat,
    locationLong,
    type,
    status,
  } = ctx.request.body;

  const { error, value: validData } = createDevice.validate({
    userId,
    name,
    description,
    locationLat,
    locationLong,
    type,
    status,
  });

  if (error) {
    throw new ValidationError(error);
  }

  const newDevice = await Device.create({
    deviceId: uuidv4(),
    ...validData,
  });

  ctx.body = {
    status: 'success',
    data: { newDevice },
  };
};

export { create };
