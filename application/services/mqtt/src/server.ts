import config from 'config';

import { appLogger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';
import { mqttClient } from './mqtt-client';
import { amqpClient } from './event-bus';

const name: string = config.get('service.name');
const topic: string = config.get('mqtt.topic');

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
  Server.shutDownServer();
});

class Server {
  private static amqpClient = amqpClient;
  private static mqttClient = mqttClient;

  public static async startServer(): Promise<void> {
    try {
      appLogger.info(`${name} service is starting`);

      /**
       * Load server, db, etc
       */

      this.amqpClient.on('open_connection', () => {
        appLogger.info('[AMQP] client connection is ready');
      });

      this.mqttClient.on('connect', () => {
        appLogger.info('[MQTT] client is up and connected');
        this.mqttClient.subscribe(topic);
      });
    } catch (error) {
      this.terminate(name, error);
    }
  }

  public static async shutDownServer(): Promise<void> {
    try {
      appLogger.info(`${name} service is stopping`);

      /**
       * Stop server, db, etc
       */

      await this.amqpClient.close();
      this.mqttClient.end();
    } catch (error) {
      this.terminate(name, error);
    }
  }

  public static async terminate(name: string, error: Error): Promise<void> {
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
