import { amqp, amqpClient } from '../index';

const exchange = amqpClient.declareExchange('device-removed', 'fanout', {
  durable: true,
});

const deviceRemovedProducer = ({
  deviceOwner,
  deviceChannel,
}: {
  deviceOwner: string;
  deviceChannel: string;
}): void => {
  amqpClient.completeConfiguration().then(() => {
    const message = new amqp.Message({ deviceOwner, deviceChannel });
    exchange.send(message);
  });
};

export { deviceRemovedProducer };
