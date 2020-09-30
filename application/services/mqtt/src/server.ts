import config from 'config';

import { logger } from './utils/logger';
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
      logger.info(`${name} service is starting`);

      /**
       * Load server, db, etc
       */

      this.amqpClient.on('open_connection', () => {
        logger.info('[AMQP] client connection is ready');
      });

      this.mqttClient.on('connect', () => {
        logger.info('[MQTT] client is up and connected');
        this.mqttClient.subscribe(topic);
        this.mqttClient.publish(
          'admin/nenad2',
          JSON.stringify({ himdsd: 55, temp: 55, fluid: 55 }),
        );
      });
    } catch (error) {
      this.terminate(name, error);
    }
  }

  public static async shutDownServer(): Promise<void> {
    try {
      logger.info(`${name} service is stopping`);

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
    logger.error(`Unable to start / stop ${name} service!`);

    /**
     * In case something is wrong log error
     * and kill process
     */

    logger.error(error);
    process.exit(1);
  }
}

Server.startServer();
