import { Message } from 'amqp-ts';
import { DefaultContext } from 'koa';

import { influxDatabaseConnection } from '../../database';

/**
 * Display all device logs
 */

const getAllLogs = async (ctx: DefaultContext): Promise<void> => {
  const deviceChannel = ctx.request.params.id;

  const logs = await influxDatabaseConnection.query(`
      select * from ${deviceChannel}
      order by time desc
    `);

  ctx.body = {
    status: 'success',
    data: logs,
  };
};

/**
 * Register log
 */

const registerLog = async (message: Message): Promise<void> => {
  const parsedMessage = JSON.parse(message.content.toString());

  await influxDatabaseConnection.writeMeasurement(parsedMessage.topic, [
    {
      fields: { ...parsedMessage.message },
    },
  ]);

  message.ack();
};

export { getAllLogs, registerLog };
