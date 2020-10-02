import { Amqp, amqpClient, appExchange } from '../index';

const logAddedPublisher = (payload: {
  topic: string;
  message: string;
}): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    appExchange.send(message, 'log.added');
  });
};

export { logAddedPublisher };
