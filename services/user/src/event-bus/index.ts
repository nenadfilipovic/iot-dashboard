import * as Amqp from 'amqp-ts';
import config from 'config';

import { appLogger } from '../utils/logger';

const amqpHost: string = config.get('rabbitmq.host');

const amqpConnection = new Amqp.Connection(`amqp://${amqpHost}?heartbeat=60`);

const amqpExchange = amqpConnection.declareExchange('app.exchange', 'direct', {
  durable: true,
});

amqpConnection
  .on('open_connection', () => {
    appLogger.info('[AMQP] client connection is ready');
  })
  .on('close_connection', () => {
    appLogger.info('[AMQP] client is closing');
  })
  .on('lost_connection', (error) => {
    appLogger.error(
      '[AMQP] client has lost connection and will try to reconnect',
    );
    appLogger.error(error);
  })
  .on('trying_connect', () => {
    appLogger.info('[AMQP] client is trying to reconnect');
  })
  .on('re_established_connection', () => {
    appLogger.info('[AMQP] client has re-established connection');
  });

export { amqpConnection, Amqp, amqpExchange };
