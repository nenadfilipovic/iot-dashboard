import { amqpClient, amqpExchange } from '../';
import { removeDeviceOnRemoveUser } from '../../components/device';

const queue = amqpClient.declareQueue('removeDeviceOnRemoveUser', {
  durable: true,
});

queue.bind(amqpExchange, 'user.removed');

const userRemovedSubscriber = (): void => {
  queue.activateConsumer(removeDeviceOnRemoveUser);
};

export { userRemovedSubscriber };
