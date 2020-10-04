import { amqpClient, amqpExchange } from '../';
import { removeSeriesOnRemoveDevice } from '../../components/log';

const queue = amqpClient.declareQueue('removeSeriesOnRemoveDevice', {
  durable: true,
});

queue.bind(amqpExchange, 'device.removed');

const deviceRemovedSubscriber = (): void => {
  queue.activateConsumer(removeSeriesOnRemoveDevice);
};

export { deviceRemovedSubscriber };
