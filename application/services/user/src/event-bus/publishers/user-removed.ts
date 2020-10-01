import { Amqp, amqpClient, appExchange } from '../index';

const userRemovedPublisher = (payload: string): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);

    /**
     * Life of a publisher,
     * on request prepare a message,
     * send that message
     * and quit
     */

    appExchange.send(message, 'user.removed');
  });
};

export { userRemovedPublisher };
