import { Amqp, exchange } from '../index';

const logAddedProducer = (log): void => {
  const message = new Amqp.Message(JSON.stringify(log));
  exchange.send(message);
};

export { logAddedProducer };
