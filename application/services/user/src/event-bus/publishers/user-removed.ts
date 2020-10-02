import { Amqp, amqpClient, appExchange } from '../index';

const userRemovedPublisher = (payload: string): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    appExchange.send(message, 'user.removed');
  });
};

export { userRemovedPublisher };
