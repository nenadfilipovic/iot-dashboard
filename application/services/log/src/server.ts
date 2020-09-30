import http from 'http';
import config from 'config';

import { influxDatabase } from './database';
import { app } from './app';
import { logger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';
import { amqpClient } from './event-bus';
import {
  logAddedListener,
  deviceRemovedListener,
  userRemovedListener,
} from './event-bus/receive';

const name: string = config.get('service.name');
const port: number = config.get('service.port');

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
  private static httpServer = http.createServer(app.callback());
  private static influxDatabase = influxDatabase;
  private static amqpClient = amqpClient;

  public static async startServer(): Promise<void> {
    try {
      logger.info(`${name} service is starting`);

      /**
       * Load server, db, etc
       */

      const influxDatabaseConnected = await this.influxDatabase.ping(5000);

      if (influxDatabaseConnected.some((host) => host.online)) {
        logger.info('Database connection established successfully');

        this.amqpClient.on('open_connection', () => {
          logger.info('[AMQP] client connection is ready');
        });

        /**
         * Start server after everything is ready
         */

        this.httpServer.listen(port, () =>
          logger.info(`Server successfully started at port ${port}`),
        );

        /**
         * Add event bus listeners
         */

        logAddedListener();
        deviceRemovedListener();
        userRemovedListener();
      } else {
        throw new Error('Database connection cannot be established!');
      }
    } catch (error) {
      this.terminate(name, error);
    }
  }

  public static async shutDownServer(): Promise<void> {
    try {
      logger.info(`${name} service is stopping`);

      /**
       * No need to close influxdb connection,
       * https://github.com/node-influx/node-influx/issues/289
       */

      await this.amqpClient.close();

      logger.info('Server is shutting down');

      this.httpServer.close((error) => {
        error ? process.exit(1) : process.exit(0);
      });
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
