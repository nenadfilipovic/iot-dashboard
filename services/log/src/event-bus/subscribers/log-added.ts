import { amqpClient, amqpExchange } from '../';
import { registerLogViaMqtt } from '../../components/log';

const queue = amqpClient.declareQueue('registerLogViaMqtt', {
  durable: true,
});

queue.bind(amqpExchange, 'log.added');

const logAddedSubscriber = (): void => {
  queue.activateConsumer(registerLogViaMqtt);
};

export { logAddedSubscriber };
