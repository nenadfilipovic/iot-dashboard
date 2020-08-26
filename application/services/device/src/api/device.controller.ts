import { DefaultContext } from 'koa';
import { v4 as uuidv4 } from 'uuid';

import { createDevice } from '../services/schemas';
import { ValidationError } from '../errors/validation';
import { Device } from '../models/Device';
import { CustomError } from '../errors/custom';

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

  const destroy = async (ctx: DefaultContext): Promise<void> => {
    const id = ctx.request.params.id;
  
    const device = await Device.findOne({ where: { deviceId: id } });
  
    if (!device) {
      throw new CustomError('Device does not exist', 401);
    }
  
    await Device.destroy({ where: { deviceId: id } });
  
    ctx.body = {
      status: 'success',
      data: {},
    };
  };

  const getMany = async (ctx: DefaultContext): Promise<void> => {
    /*const id = ctx.request.params.id;
  
    const devices = await Device.findOne({ where: { userId: id } });
  
    if (!devices) {
      throw new CustomError('Device does not exist', 401);
    }
  
    ctx.body = {
      status: 'success',
      data: { devices },
    };*/
  };

  const getOne = async (ctx: DefaultContext): Promise<void> => {
    const id = ctx.request.params.id;
  
    const device = await Device.findOne({ where: { deviceId: id } });
  
    if (!device) {
      throw new CustomError('Device does not exist', 401);
    }
  
    ctx.body = {
      status: 'success',
      data: { device },
    };
  };

  const modify = async (ctx: DefaultContext): Promise<void> => {
    const id = ctx.request.params.id;
  
    const updateData = ctx.request.body;
  
    const existingDevice = await Device.findOne({
      where: { deviceId: id },
    });
  
    if (!existingDevice) {
      throw new CustomError(
        'Device you are trying to modify does not exist.',
        401,
      );
    }
  
    const [affectedRows, result] = await Device.update(
      { updateData },
      { returning: true, where: { deviceId: id } },
    );
  
    ctx.body = {
      status: 'success',
      data: { result },
    };
  };

  export {create, modify, destroy, getOne, getMany}