import { Amqp, amqpClient, appExchange } from '../index';

const deviceRemovedPublisher = (payload: {
  deviceOwner: string;
  deviceChannel: string;
}): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    appExchange.send(message, 'device.removed');
  });
};

export { deviceRemovedPublisher };
