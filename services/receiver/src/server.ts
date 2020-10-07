import config from 'config';

import { appLogger } from './utils/logger';
import { amqpClient } from './event-bus';
import { mqttClient } from './mqtt-client';
import { ErrorHandler } from './errors/error-handler';

const name: string = config.get('services.receiver.name');
const topic: string = config.get('services.receiver.mqttClient.topic');

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

class Server {
  public static async startServer() {
    try {
      appLogger.info(`${name} service is starting`);

      /**
       * Subscribe to topic after connection
       * is ready
       */

      mqttClient.on('connect', () => {
        appLogger.info('[MQTT] - Client successfully connected');
        mqttClient.subscribe(topic, { qos: 2 });
      });
    } catch (error) {
      this.terminateServer(name, error);
    }
  }

  public static async stopServer() {
    try {
      appLogger.info(`${name} service is stopping`);

      await amqpClient.close();

      mqttClient.end();

      process.exit(0);
    } catch (error) {
      this.terminateServer(name, error);
    }
  }

  public static terminateServer(name: string, error: Error) {
    appLogger.error(`Unable to start / stop ${name} service`);

    /**
     * In case something is wrong log error
     * and kill process
     */

    appLogger.error(error);
    process.exit(1);
  }
}

Server.startServer();
