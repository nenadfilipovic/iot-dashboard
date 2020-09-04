import MQTT from 'mqtt';
import * as AMQP from 'amqp-ts';
import config from 'config';

import { logger } from './utils/logger';

const host: string = config.get('mqtt.host');
const port: number = config.get('mqtt.port');
const username: string = config.get('mqtt.username');
const password: string = config.get('mqtt.password');
const topic: string = config.get('mqtt.topic');

const connection = new AMQP.Connection('amqp://rabbitmq');
const exchange = connection.declareExchange('log.added');

const mqttOptions = {
  host,
  port,
  username,
  password,
};

const client = MQTT.connect(mqttOptions);

client.on('connect', () => {
  logger.info(`MQTT client is connected to ${host} at port ${port}`);

  client.subscribe(topic);

  client.on('message', (topic, message) => {
    if (!topic.startsWith('$')) {
      const msg = new AMQP.Message(
        JSON.stringify({
          topic: topic,
          message: JSON.parse(message.toString()),
        }),
      );
      exchange.send(msg);
    }
  });
  client.end();
});

client.on('error', (error) => {
  logger.error('Something is wrong!');
  throw error;
});
