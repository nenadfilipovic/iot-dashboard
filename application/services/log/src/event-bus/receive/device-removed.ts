import { amqpClient } from '../index';
import { removeSeriesOnRemoveDevice } from '../../components/log';

const exchange = amqpClient.declareExchange('device-removed', 'fanout', {
  durable: true,
});
const queue = amqpClient.declareQueue('', { exclusive: true });

queue.bind(exchange);

const deviceRemovedListener = (): void => {
  exchange.activateConsumer(removeSeriesOnRemoveDevice);
};

export { deviceRemovedListener };
