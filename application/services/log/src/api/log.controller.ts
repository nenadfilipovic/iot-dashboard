import { DefaultContext } from 'koa';
import * as AMQP from 'amqp-ts';

import { db } from '../db/influx';
import { BadRequestError } from '../errors/BadRequestError';

const connection = new AMQP.Connection('amqp://rabbitmq');
const exchange = connection.declareExchange('log.added');
const queue = connection.declareQueue('queue');
queue.bind(exchange);

/**
 * Create log...
 */

queue.activateConsumer((message) => {
  try {
    const parseMessage = JSON.parse(message.content.toString());
    db.writeMeasurement(parseMessage.topic, [
      {
        fields: { ...parseMessage.message },
      },
    ]);
    message.ack();
  } catch (error) {
    throw new BadRequestError(error.message);
  }
});

/**
 * Display all device logs...
 */

const all = async (ctx: DefaultContext): Promise<void> => {
  try {
    const { id } = ctx.request.params;

    const logs = await db.query(`
      select * from ${id}
      order by time desc
    `);

    ctx.body = {
      status: 'success',
      data: logs,
    };
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

export { all };
