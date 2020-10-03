import { Amqp, amqpConnection, amqpExchange } from '../index';

const userRemovedPublisher = (payload: string): void => {
  amqpConnection.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    amqpExchange.send(message, 'user.removed');
  });
};

export { userRemovedPublisher };
