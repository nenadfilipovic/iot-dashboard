import config from 'config';
import mqtt from 'mqtt';

import { logAddedProducer } from '../event-bus/send';
import { logger } from '../utils/logger';

const host: string = config.get('mqtt.host');
const port: number = config.get('mqtt.port');
const username: string = config.get('mqtt.username');
const password: string = config.get('mqtt.password');

const mqttConfig = {
  host,
  port,
  username,
  password,
  reconnectPeriod: 10000,
};

const mqttClient = mqtt.connect(mqttConfig);

mqttClient.on('message', (topic, message) => {
  if (!topic.startsWith('$')) logAddedProducer(parseMessage(topic, message));
  mqttClient.end();
});

mqttClient.on('end', () => {
  logger.info('[MQTT] client is shutting down');
});

mqttClient.on('error', (error) => {
  logger.error(error);
});

mqttClient.on('reconnect', () => {
  logger.info('[MQTT] client is trying to reconnect');
});

const parseMessage = (topic: string, message: Buffer) => {
  const parsedMessage = JSON.parse(message.toString());
  return {
    topic,
    message: parsedMessage,
  };
};

export { mqttClient };
