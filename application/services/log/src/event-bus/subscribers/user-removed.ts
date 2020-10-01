import { amqpClient, appExchange } from '../index';
import { removeMeasurementOnRemoveUser } from '../../components/log';

const queue = amqpClient.declareQueue('user.remove.queue', {
  durable: true,
});

queue.bind(appExchange, 'user.removed');

const userRemovedSubscriber = (): void => {
  queue.activateConsumer(removeMeasurementOnRemoveUser);
};

export { userRemovedSubscriber };
