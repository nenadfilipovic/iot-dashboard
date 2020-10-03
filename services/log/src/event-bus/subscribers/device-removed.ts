import { amqpConnection, amqpExchange } from '../index';
import { removeSeriesOnRemoveDevice } from '../../components/log';

const queue = amqpConnection.declareQueue('removeSeriesOnRemoveDevice', {
  durable: true,
});

queue.bind(amqpExchange, 'device.removed');

const deviceRemovedSubscriber = (): void => {
  queue.activateConsumer(removeSeriesOnRemoveDevice);
};

export { deviceRemovedSubscriber };
