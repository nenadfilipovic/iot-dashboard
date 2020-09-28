import config from 'config';

import { logger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';
import { eventBus } from './event-bus';
import { mqttClient } from './mqtt-client';

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
  private static eventBus = eventBus;
  private static mqttClient = mqttClient;

  public static async startServer(): Promise<void> {
    try {
      logger.info(`${name} service is starting`);

      /**
       * Load server, db, etc
       */

      mqttClient.on('connect', () => {
        logger.info('Mqtt client have successfully connected to broker'),
          mqttClient.subscribe(topic);
      });
    } catch (error) {
      logger.error(`Unable to start ${name} service!`);

      /**
       * In case something is wrong log error
       * and kill process
       */

      logger.error(error);
      process.exit(1);
    }
  }

  public static async shutDownServer(): Promise<void> {
    try {
      logger.info(`${name} service is stopping`);
      this.mqttClient.end();
    } catch (error) {
      logger.error('Unable to shut down service gracefully, exiting');

      /**
       * In case something is wrong log error
       * and kill process
       */

      logger.error(error);
      process.exit(1);
    }
  }
}

Server.startServer();
