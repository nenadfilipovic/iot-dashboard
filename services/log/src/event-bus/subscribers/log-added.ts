import { amqpConnection, amqpExchange } from '../index';
import { registerLogViaMqtt } from '../../components/log';

const queue = amqpConnection.declareQueue('registerLogViaMqtt', {
  durable: true,
});

queue.bind(amqpExchange, 'log.added');

const logAddedSubscriber = (): void => {
  queue.activateConsumer(registerLogViaMqtt);
};

export { logAddedSubscriber };
