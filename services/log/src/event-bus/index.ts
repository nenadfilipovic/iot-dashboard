import * as Amqp from 'amqp-ts';
import config from 'config';

import { appLogger } from '../utils/logger';

const host: string = config.get('rabbitmq.host');

const amqpClient = new Amqp.Connection(
  `amqp://${host}?heartbeat=60`,
  {},
  { retries: 30, interval: 30000 },
);

const amqpExchange = amqpClient.declareExchange('app.exchange', 'direct', {
  durable: true,
});

amqpClient
  .on('open_connection', () => {
    appLogger.info('[AMQP] - client is connected');
  })
  .on('close_connection', () => {
    appLogger.info('[AMQP] - client is closing');
  })
  .on('lost_connection', (error) => {
    appLogger.error(
      '[AMQP] - client has lost connection and will try to reconnect',
    );
    appLogger.error(error);
  })
  .on('trying_connect', () => {
    appLogger.info('[AMQP] - client is trying to reconnect');
  })
  .on('re_established_connection', () => {
    appLogger.info('[AMQP] - client has re-established connection');
  });

export { amqpClient, Amqp, amqpExchange };
