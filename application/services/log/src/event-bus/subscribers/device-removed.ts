import { amqpClient, appExchange } from '../index';
import { removeSeriesOnRemoveDevice } from '../../components/log';

const queue = amqpClient.declareQueue('device.removed.queue', {
  durable: true,
});

queue.bind(appExchange, 'device.removed');

const deviceRemovedSubscriber = (): void => {
  queue.activateConsumer(removeSeriesOnRemoveDevice);
};

export { deviceRemovedSubscriber };
