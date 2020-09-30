import { amqp, amqpClient } from '../index';

const exchange = amqpClient.declareExchange('user-removed', 'fanout', {
  durable: true,
});

const userRemovedProducer = (payload: string): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new amqp.Message(payload);
    exchange.send(message);
  });
};

export { userRemovedProducer };
