import { Amqp, amqpClient, amqpExchange } from '../';

const logAddedPublisher = (payload: {
  topic: string;
  message: string;
}): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    amqpExchange.send(message, 'log.added');
  });
};

export { logAddedPublisher };
