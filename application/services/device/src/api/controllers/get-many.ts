import { DefaultContext } from 'koa';
import { Device } from '../models/Device';
import { CustomError } from '../../errors/custom';

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

export { getMany };
