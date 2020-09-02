import { DefaultContext } from 'koa';
import * as AMQP from 'amqp-ts';

import { db } from '../db/influx';

const connection = new AMQP.Connection('amqp://rabbitmq');
const exchange = connection.declareExchange('log.added');
const queue = connection.declareQueue('queue');
queue.bind(exchange);

/**
 * Create log...
 */

queue.activateConsumer((message) => {
  const parseMessage = JSON.parse(message.content.toString());
  db.writeMeasurement(parseMessage.topic, [
    {
      fields: { ...parseMessage.message },
    },
  ]);
  message.ack();
});

/**
 * Display all device logs...
 */

const all = async (ctx: DefaultContext): Promise<void> => {
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

export { all };
