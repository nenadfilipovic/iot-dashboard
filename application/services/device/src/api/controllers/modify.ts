import { DefaultContext } from 'koa';

import { Device } from '../models/Device';
import { CustomError } from '../../errors/custom';

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

export { modify };
