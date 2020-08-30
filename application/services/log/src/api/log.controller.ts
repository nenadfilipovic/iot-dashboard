import { DefaultContext } from 'koa';

import { Log } from '../models/Log';
import { logger } from '../utils/logger';

/**
 * Create log...
 */

const create = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const currentUser = ctx.state.user.id;

  const { temperature, pressure, humidity } = ctx.request.body;

  const newLog = Log.build({
    user: currentUser,
    device: id,
    temperature,
    pressure,
    humidity,
  });

  await newLog.save();

  logger.info(`User : ${currentUser} - Device : ${id} created log.`);
};

/**
 * Display all device logs...
 */

const all = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const currentUser = ctx.state.user.id;

  const logs = await Log.findAll({
    where: { user: currentUser, device: id },
  });

  ctx.body = {
    status: 'success',
    data: { logs },
  };
};

export { create, all };
