import { DefaultContext } from 'koa';
import { Device } from '../models/Device';
import { CustomError } from '../../errors/custom';

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

export { getOne };
