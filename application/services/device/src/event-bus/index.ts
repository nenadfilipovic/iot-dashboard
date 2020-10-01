import * as Amqp from 'amqp-ts';
import config from 'config';

import { appLogger } from '../utils/logger';

const host: string = config.get('amqp.host');

const amqpClient = new Amqp.Connection(`amqp://${host}?heartbeat=60`);

const appExchange = amqpClient.declareExchange('app.exchange', 'direct', {
  durable: true,
});

amqpClient.on('close_connection', () => {
  appLogger.info('[AMQP] client is closing');
});

amqpClient.on('lost_connection', () => {
  appLogger.error(
    '[AMQP] client has lost connection and will try to reconnect',
  );
});

amqpClient.on('trying_connect', () => {
  appLogger.info('[AMQP] client is trying to reconnect');
});

amqpClient.on('re_established_connection', () => {
  appLogger.info('[AMQP] client has re-established connection');
});

export { amqpClient, Amqp, appExchange };
