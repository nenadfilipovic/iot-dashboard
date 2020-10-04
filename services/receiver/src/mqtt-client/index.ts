import mqtt from 'mqtt';
import config from 'config';

import { logAddedPublisher } from '../event-bus/publishers';
import { appLogger } from '../utils/logger';

const host: string = config.get('emqx.host');
const port: number = config.get('emqx.port');
const username: string = config.get('services.receiver.mqttClient.username');
const password: string = config.get('services.receiver.mqttClient.password');
const clientId: string = config.get('services.receiver.mqttClient.clientId');

const mqttClient = mqtt.connect({
  host,
  port,
  username,
  password,
  clientId,
  clean: false,
  connectTimeout: 10000,
});

mqttClient
  .on('error', (error) => {
    appLogger.error('[MQTT] - Error occured');
    appLogger.error(error);
  })
  .on('reconnect', () => {
    appLogger.info('[MQTT] - Trying to reconnect');
  })

  /**
   * Here we destructure mqtt message,
   * and take message and topic
   * from it
   */

  .on('message', (topic, message) => {
    if (!topic.startsWith('$'))
      logAddedPublisher(parseMessage(topic, message.toString()));
  })
  .on('end', () => {
    appLogger.info('[MQTT] - client is shutting down');
  });

/**
 * Mqtt message comes as Buffer so we need,
 * to convert it to string and then parse
 * as JSON because broker require you
 * to send your data as JSON string
 */

const parseMessage = (topic: string, message: string) => {
  return {
    topic,
    message: validateMessage(message),
  };
};

const validateMessage = (message: string) => {
  try {
    return JSON.parse(message);
  } catch (error) {
    appLogger.error(error);
  }
};

export { mqttClient };
