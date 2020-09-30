import { amqp, amqpClient } from '../index';

const exchange = amqpClient.declareExchange('log-added', 'fanout', {
  durable: true,
});

const logAddedProducer = (payload: {
  topic: string;
  message: string;
}): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new amqp.Message(payload);
    exchange.send(message);
  });
};

export { logAddedProducer };
