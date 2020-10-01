import { amqpClient, appExchange } from '../index';
import { registerLogViaMqtt } from '../../components/log';

const queue = amqpClient.declareQueue('log.added.queue', {
  durable: true,
});

queue.bind(appExchange, 'log.added');

const logAddedSubscriber = (): void => {
  queue.activateConsumer(registerLogViaMqtt);
};

export { logAddedSubscriber };
