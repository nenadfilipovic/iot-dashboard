import { amqpClient } from '../index';
import { registerLog } from '../../components/log';

const exchange = amqpClient.declareExchange('log-added', 'fanout', {
  durable: true,
});
const queue = amqpClient.declareQueue('', { exclusive: true });

queue.bind(exchange);

const logAddedListener = (): void => {
  queue.activateConsumer(registerLog);
};

export { logAddedListener };
