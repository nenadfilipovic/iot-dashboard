import { amqpClient } from '../index';
import { removeMeasurementOnRemoveUser } from '../../components/log';

const exchange = amqpClient.declareExchange('user-removed', 'fanout', {
  durable: true,
});
const queue = amqpClient.declareQueue('', { exclusive: true });

queue.bind(exchange);

const userRemovedListener = (): void => {
  exchange.activateConsumer(removeMeasurementOnRemoveUser);
};

export { userRemovedListener };
