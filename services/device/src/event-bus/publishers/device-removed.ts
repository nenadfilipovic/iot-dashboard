import { Amqp, amqpClient, amqpExchange } from '../';

const deviceRemovedPublisher = (payload: {
  owner: string;
  channel: string;
}): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    amqpExchange.send(message, 'device.removed');
  });
};

export { deviceRemovedPublisher };
