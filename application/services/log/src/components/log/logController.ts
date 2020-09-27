import { DefaultContext } from 'koa';
import * as AMQP from 'amqp-ts';

import { initDatabase } from '../../database';
import { BaseError } from '../../errors/BaseError';

/**
 * Display all device logs...
 */

const getAllLogs = async (ctx: DefaultContext): Promise<void> => {
  const { id } = ctx.request.params;

  const logs = await db.query(`
      select * from ${id}
      order by time desc
    `);

  ctx.body = {
    status: 'success',
    data: logs,
  };
};

export { getAllLogs };

// /**
//  * Create log...
//  */

// queue.activateConsumer((message) => {
//   try {
//     const parseMessage = JSON.parse(message.content.toString());
//     db.writeMeasurement(parseMessage.topic, [
//       {
//         fields: { ...parseMessage.message },
//       },
//     ]);
//     message.ack();
//   } catch (error) {
//     throw new BadRequestError(error.message);
//   }
// });

// const connection = new AMQP.Connection('amqp://rabbitmq');
// const exchange = connection.declareExchange('log.added');
// const queue = connection.declareQueue('queue');
// queue.bind(exchange);
