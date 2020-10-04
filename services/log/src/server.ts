process.env['NODE_CONFIG_DIR'] = '../../config';

import http from 'http';
import config from 'config';

import { app } from './app';
import { influxDatabase } from './database';
import { appLogger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';
import { amqpClient } from './event-bus'; //
import {
  logAddedSubscriber,
  deviceRemovedSubscriber,
  userRemovedSubscriber,
} from './event-bus/subscribers';

const name: string = config.get('services.log.name');
const port: number = config.get('services.log.port');

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

const httpServer = http.createServer(app.callback());

class Server {
  public static async startServer() {
    try {
      appLogger.info(`${name} service is starting`);

      const influxDatabaseConnected = await influxDatabase.ping(5000);

      if (influxDatabaseConnected.some((host) => host.online)) {
        appLogger.info('Database connection established successfully');

        /**
         * Add event bus listeners
         */

        logAddedSubscriber();
        deviceRemovedSubscriber();
        userRemovedSubscriber();

        /**
         * Start server after everything is ready
         */

        httpServer.listen(port, () =>
          appLogger.info(`Server successfully started at port ${port}`),
        );
      }
    } catch (error) {
      this.terminateServer(name, error);
    }
  }

  public static async stopServer() {
    try {
      appLogger.info(`${name} service is stopping`);

      /**
       * No need to close influxdb connection,
       * https://github.com/node-influx/node-influx/issues/289
       */

      await amqpClient.close();

      httpServer.close((error) => {
        appLogger.info('Server is shutting down');
        error ? process.exit(1) : process.exit(0);
      });
    } catch (error) {
      this.terminateServer(name, error);
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
