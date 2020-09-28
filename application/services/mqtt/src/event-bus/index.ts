// import * as Amqp from 'amqp-ts';
// import config from 'config';

// import { logger } from '../utils/logger';

// const host: string = config.get('amqp.host');

// const eventBus = new Amqp.Connection(`amqp://${host}?heartbeat=60`);

// const exchange = eventBus.declareExchange('log-added', 'fanout', {
//   durable: true,
// });

// eventBus.on('open_connection', () => {
//   logger.info('Event bus connection is ready');
// });

// eventBus.on('close_connection', () => {
//   logger.info('Event bus is closing');
// });

// eventBus.on('lost_connection', () => {
//   logger.error('Event bus has lost connection and will try to reconnect');
// });

// eventBus.on('trying_connect', () => {
//   logger.info('Event bus is trying to reconnect');
// });

// eventBus.on('re_established_connection', () => {
//   logger.info('Event bus has re-established connection');
// });

// export { exchange, Amqp, eventBus };

import amqp from 'amqplib';
import config from 'config';

const host: string = config.get('amqp.host');

const eventBus = amqp.connect(`amqp://${host}`);
