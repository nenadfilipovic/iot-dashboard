import { Amqp, amqpClient, appExchange } from '../index';

const deviceRemovedPublisher = (payload: {
  deviceOwner: string;
  deviceChannel: string;
}): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new Amqp.Message(payload);

    /**
     * Life of a publisher,
     * on request prepare a message,
     * send that message
     * and quit
     */

    appExchange.send(message, 'device.removed');
  });
};

export { deviceRemovedPublisher };
