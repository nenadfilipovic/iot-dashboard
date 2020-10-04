import { amqpClient, amqpExchange } from '../';
import { removeMeasurementOnRemoveUser } from '../../components/log';

const queue = amqpClient.declareQueue('removeMeasurementOnRemoveUser', {
  durable: true,
});

queue.bind(amqpExchange, 'user.removed');

const userRemovedSubscriber = (): void => {
  queue.activateConsumer(removeMeasurementOnRemoveUser);
};

export { userRemovedSubscriber };
