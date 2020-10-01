import { amqpClient, appExchange } from '../index';
import { removeDeviceOnRemoveUser } from '../../components/device';

const queue = amqpClient.declareQueue('user.remove.queue', {
  durable: true,
});

queue.bind(appExchange, 'user.removed');

const userRemovedSubscriber = (): void => {
  queue.activateConsumer(removeDeviceOnRemoveUser);
};

export { userRemovedSubscriber };
