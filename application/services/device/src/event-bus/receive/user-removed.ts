import { amqpClient } from '../index';
import { removeDeviceOnRemoveUser } from '../../components/device';

const exchange = amqpClient.declareExchange('user-removed', 'fanout', {
  durable: true,
});
const queue = amqpClient.declareQueue('', { exclusive: true });

queue.bind(exchange);

const userRemovedListener = (): void => {
  exchange.activateConsumer(removeDeviceOnRemoveUser);
};

export { userRemovedListener };
