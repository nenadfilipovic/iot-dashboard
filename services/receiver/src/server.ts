process.env['NODE_CONFIG_DIR'] = '../../config';

import config from 'config';

import { appLogger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';
import { amqpConnection } from './event-bus';
import { logAddedPublisher } from './event-bus/publishers';
import { mqttConnection } from './mqtt-client';

const serviceName: string = config.get('services.receiver.name');
const mqttClientHost: string = config.get('services.receiver.mqttClient.host');
const mqttClientPort: number = config.get('services.receiver.mqttClient.port');
const mqttClientUsername: string = config.get(
  'services.receiver.mqttClient.username',
);
const mqttClientPassword: string = config.get(
  'services.receiver.mqttClient.password',
);
const mqttClientTopic: string = config.get(
  'services.receiver.mqttClient.topic',
);

process.on('unhandledRejection', (reason: string) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

process.on('SIGINT', () => {
  Server.stopServer();
});

const mqttClient = mqttConnection({
  host: mqttClientHost,
  port: mqttClientPort,
  username: mqttClientUsername,
  password: mqttClientPassword,
});

class Server {
  public static async startServer() {
    try {
      appLogger.info(`${serviceName} service is starting`);

      /**
       * Start event bus
       */

      await amqpConnection.initialized;

      /**
       * Start mqtt client
       */

      mqttClient

        /**
         * Here we destructure mqtt message,
         * and take message and topic
         * from it
         */

        .on('message', (topic, message) => {
          if (!topic.startsWith('$'))
            logAddedPublisher(parseMessage(topic, message));
        })

        .on('end', () => {
          appLogger.info('[MQTT] client is shutting down');
        })

        .on('error', (error) => {
          appLogger.error(error);
        })

        .on('reconnect', () => {
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

      await mqttClient.subscribe(mqttClientTopic);

      appLogger.info('[MQTT] client is up and connected');
    } catch (error) {
      this.terminateServer(serviceName, error);
    }
  }

  public static async stopServer() {
    try {
      appLogger.info(`${serviceName} service is stopping`);

      await amqpConnection.close();

      await mqttClient.end();
    } catch (error) {
      this.terminateServer(serviceName, error);
    }
  }

  public static terminateServer(name: string, error: Error) {
    appLogger.error(`Unable to start / stop ${name} service!`);

    /**
     * In case something is wrong log error
     * and kill process
     */

    appLogger.error(error);
    process.exit(1);
  }
}

Server.startServer();
