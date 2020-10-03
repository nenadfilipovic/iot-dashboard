import { amqpConnection, amqpExchange } from '../index';
import { removeMeasurementOnRemoveUser } from '../../components/log';

const queue = amqpConnection.declareQueue('removeMeasurementOnRemoveUser', {
  durable: true,
});

queue.bind(amqpExchange, 'user.removed');

const userRemovedSubscriber = (): void => {
  queue.activateConsumer(removeMeasurementOnRemoveUser);
};

export { userRemovedSubscriber };
