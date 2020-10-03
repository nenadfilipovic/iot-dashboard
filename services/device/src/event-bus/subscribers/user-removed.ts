import { amqpConnection, amqpExchange } from '../index';
import { removeDeviceOnRemoveUser } from '../../components/device';

const queue = amqpConnection.declareQueue('removeDeviceOnRemoveUser', {
  durable: true,
});

queue.bind(amqpExchange, 'user.removed');

const userRemovedSubscriber = (): void => {
  queue.activateConsumer(removeDeviceOnRemoveUser);
};

export { userRemovedSubscriber };
