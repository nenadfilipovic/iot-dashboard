import mqtt from 'mqtt';
import config from 'config';

import { logger } from '../utils/logger';
import { logAddedProducer } from '../event-bus/send';

const host: string = config.get('mqtt.host');
const port: number = config.get('mqtt.port');
const username: string = config.get('mqtt.username');
const password: string = config.get('mqtt.password');

const mqttClient = mqtt.connect({
  host,
  port,
  username,
  password,
});

mqttClient.on('error', (error) => logger.error(error.message));

mqttClient.on('reconnect', () =>
  logger.info('Mqtt client is trying to reconnect'),
);

mqttClient.on('message', (topic, message) => {
  logAddedProducer(
    JSON.stringify({
      topic,
      message: JSON.parse(message.toString()),
    }),
  );
});

mqttClient.on('end', () => logger.info('Mqtt client is shutting down'));

export { mqttClient };
