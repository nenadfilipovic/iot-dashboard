import { Amqp, amqpConnection, amqpExchange } from '../index';

const logAddedPublisher = (payload: {
  topic: string;
  message: string;
}): void => {
  amqpConnection.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    amqpExchange.send(message, 'log.added');
  });
};

export { logAddedPublisher };
