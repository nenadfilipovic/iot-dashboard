import * as amqp from 'amqp-ts';
import config from 'config';

import { logger } from '../utils/logger';

const host: string = config.get('amqp.host');

const amqpClient = new amqp.Connection(`amqp://${host}?heartbeat=60`);

amqpClient.on('close_connection', () => {
  logger.info('[AMQP] client is closing');
});

amqpClient.on('lost_connection', () => {
  logger.error('[AMQP] client has lost connection and will try to reconnect');
});

amqpClient.on('trying_connect', () => {
  logger.info('[AMQP] client is trying to reconnect');
});

amqpClient.on('re_established_connection', () => {
  logger.info('[AMQP] client has re-established connection');
});

export { amqpClient, amqp };
