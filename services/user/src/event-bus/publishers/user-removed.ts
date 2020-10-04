import { Amqp, amqpClient, amqpExchange } from '../';

const userRemovedPublisher = (payload: string): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    amqpExchange.send(message, 'user.removed');
  });
};

export { userRemovedPublisher };
