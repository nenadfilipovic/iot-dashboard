import * as Amqp from 'amqp-ts';
import config from 'config';

import { logger } from '../utils/logger';

const host: string = config.get('amqp.host');

const eventBusConnection = new Amqp.Connection(`amqp://${host}?heartbeat=60`);

const exchange = eventBusConnection.declareExchange('log-added', 'fanout', {
  durable: true,
});
const queue = eventBusConnection.declareQueue('', { exclusive: true });

queue.bind(exchange);

eventBusConnection.on('open_connection', () => {
  logger.info('Event bus connection is ready');
});

eventBusConnection.on('close_connection', () => {
  logger.info('Event bus is closing');
});

eventBusConnection.on('lost_connection', () => {
  logger.error('Event bus has lost connection and will try to reconnect');
});

eventBusConnection.on('trying_connect', () => {
  logger.info('Event bus is trying to reconnect');
});

eventBusConnection.on('re_established_connection', () => {
  logger.info('Event bus has re-established connection');
});

export { queue, eventBusConnection };
