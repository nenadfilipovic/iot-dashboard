import { DefaultContext } from 'koa';

import { Device } from '../models/Device';
import { CustomError } from '../../errors/custom';

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

export { destroy };
