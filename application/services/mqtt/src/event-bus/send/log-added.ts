import { amqp, amqpClient } from '../index';

const exchange = amqpClient.declareExchange('log-added', 'fanout', {
  durable: true,
});

const logAddedProducer = (log: { topic: string; message: string }): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new amqp.Message(log);
    exchange.send(message);
  });
};

export { logAddedProducer };
