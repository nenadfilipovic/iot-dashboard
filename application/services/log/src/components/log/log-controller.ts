import { Message } from 'amqp-ts';
import { DefaultContext } from 'koa';

import { influxDatabase } from '../../database';

/**
 * Display all device logs
 */

const getAllLogs = async (ctx: DefaultContext): Promise<void> => {
  const deviceOwner = ctx.state.user.id;
  const deviceChannel = ctx.request.params.id;

  const logs = await influxDatabase.query(`
      select * from "${deviceOwner}/${deviceChannel}"
      order by time desc
    `);

  ctx.body = {
    status: 'success',
    message: 'You have successfully retrieved all your logs.',
    data: logs,
  };
};

/**
 * Register log
 */

const registerLog = async (message: Message): Promise<void> => {
  const parsedMessage = JSON.parse(message.content.toString());

  console.log(parsedMessage);

  await influxDatabase.writeMeasurement(parsedMessage.topic, [
    {
      fields: { ...parsedMessage.message },
    },
  ]);

  message.ack();
};

export { getAllLogs, registerLog };
