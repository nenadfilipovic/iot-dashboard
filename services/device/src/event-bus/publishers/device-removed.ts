import { Amqp, amqpConnection, amqpExchange } from '../index';

const deviceRemovedPublisher = (payload: {
  deviceOwner: string;
  deviceChannel: string;
}): void => {
  amqpConnection.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    amqpExchange.send(message, 'device.removed');
  });
};

export { deviceRemovedPublisher };
