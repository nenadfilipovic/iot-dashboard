import config from 'config';
import mqtt from 'mqtt';

import { logAddedPublisher } from '../event-bus/publishers';
import { appLogger } from '../utils/logger';

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

/**
 * Here we destructure mqtt message,
 * and take message and topic
 * from it
 */

mqttClient.on('message', (topic, message) => {
  if (!topic.startsWith('$')) logAddedPublisher(parseMessage(topic, message));
});

mqttClient.on('end', () => {
  appLogger.info('[MQTT] client is shutting down');
});

mqttClient.on('error', (error) => {
  appLogger.error(error);
});

mqttClient.on('reconnect', () => {
  appLogger.info('[MQTT] client is trying to reconnect');
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

const mqtt2 = mqtt.connect({
  host,
  port,
  username: 'dashboard',
  password: '1234567',
  reconnectPeriod: 10000,
  clientId: 'nenad2',
});

mqtt2.on('connect', () => {
  mqtt2.publish('dashboard/nenad2', JSON.stringify({ nenad: 'jebac' }));
  mqtt2.end();
});
