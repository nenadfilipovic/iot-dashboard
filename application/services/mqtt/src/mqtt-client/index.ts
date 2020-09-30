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
  clientId: 'nenad2',
};

const mqttClient = mqtt.connect(mqttConfig);

/**
 * Here we destructure mqtt message,
 * and take message and topic
 * from it
 */

mqttClient.on('message', (topic, message) => {
  if (!topic.startsWith('$')) logAddedProducer(parseMessage(topic, message));
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

/**
 * Mqtt message comes as Buffer so we need,
 * to convert it to string and then parse
 * as JSON because broker require you
 * to send your data as JSON string
 */

const parseMessage = (topic: string, message: Buffer) => {
  return {
    topic,
    message: JSON.parse(message.toString()),
  };
};

export { mqttClient };
