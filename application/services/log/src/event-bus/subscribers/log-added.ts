import { amqpClient, appExchange } from '../index';
import { registerLogViaMqtt } from '../../components/log';

const queue = amqpClient.declareQueue('registerLogViaMqtt', {
  durable: true,
});

queue.bind(appExchange, 'log.added');

const logAddedSubscriber = (): void => {
  queue.activateConsumer(registerLogViaMqtt);
};

export { logAddedSubscriber };
