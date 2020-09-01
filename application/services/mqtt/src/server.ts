import MQTT from 'async-mqtt';
import AMQP from 'amqplib';
import config from 'config';

const name: string = config.get('service.name');
const mqttHost: string = config.get('mqtt.host');
const port: number = config.get('mqtt.port');
const username: string = config.get('mqtt.username');
const password: string = config.get('mqtt.password');
const clientId: string = config.get('mqtt.clientId');
const topic: string = config.get('mqtt.topic');
const amqpHost: string = config.get('amqp.host');

import { logger } from './utils/logger';

const startAMQP = async () => {
  await AMQP.connect(amqpHost);
};

const startMQTT = async () => {
  logger.info(`${name} service starting.`);

  const client = await MQTT.connectAsync({
    host: mqttHost,
    port,
    username,
    password,
    clientId,
  });

  client.on('connect', () => {
    logger.info('Successfully connected to broker.');
    client.subscribe(topic);
  });

  client.on('message', (topic, message) => {
    console.log(topic, message);
  });
};

startMQTT()
  .then(() => {
    startAMQP()
      .then(() => logger.info('Successfully connected to AMQP server.'))
      .catch((error) => {
        logger.error('Unable to connect to AMQP server!');
        throw new Error(error);
      });
  })
  .catch((error) => {
    logger.error(`Unable to start ${name} service!`);
    throw new Error(error);
  });
