import { Amqp, amqpClient, appExchange } from '../index';

const logAddedPublisher = (payload: {
  topic: string;
  message: string;
}): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);
    /**
     * Life of a publisher,
     * on request prepare a message,
     * send that message
     * and quit
     */

    appExchange.send(message, 'log.added');
  });
};

export { logAddedPublisher };
