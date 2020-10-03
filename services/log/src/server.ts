process.env['NODE_CONFIG_DIR'] = '../../config';

import http from 'http';
import config from 'config';

import { app } from './app';
import { appLogger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';
import { amqpConnection } from './event-bus';
import {
  logAddedSubscriber,
  deviceRemovedSubscriber,
  userRemovedSubscriber,
} from './event-bus/subscribers';
import { influxDatabaseConnection } from './database';

const serviceName: string = config.get('services.log.name');
const servicePort: number = config.get('services.log.port');
const influxHost: string = config.get('influxdb.host');
const influxPort: number = config.get('influxdb.port');
const influxUsername: string = config.get('influxdb.username');
const influxPassword: string = config.get('influxdb.password');
const influxDatabaseName: string = config.get('services.log.influxdb.name');

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

const influxDatabase = influxDatabaseConnection({
  database: influxDatabaseName,
  username: influxUsername,
  password: influxPassword,
  port: influxPort,
  host: influxHost,
});

class Server {
  public static async startServer() {
    try {
      appLogger.info(`${serviceName} service is starting`);

      const influxDatabaseConnected = await influxDatabase.ping(5000);

      if (influxDatabaseConnected.some((host) => host.online)) {
        appLogger.info('Database connection established successfully');

        /**
         * Start event bus
         */

        await amqpConnection.initialized;

        /**
         * Add event bus listeners
         */

        logAddedSubscriber();
        deviceRemovedSubscriber();
        userRemovedSubscriber();

        /**
         * Start server after everything is ready
         */

        httpServer.listen(servicePort, () =>
          appLogger.info(`Server successfully started at port ${servicePort}`),
        );
      }
    } catch (error) {
      this.terminateServer(serviceName, error);
    }
  }

  public static async stopServer() {
    try {
      appLogger.info(`${serviceName} service is stopping`);

      /**
       * No need to close influxdb connection,
       * https://github.com/node-influx/node-influx/issues/289
       */

      await amqpConnection.close();

      httpServer.close((error) => {
        appLogger.info('Server is shutting down');
        error ? process.exit(1) : process.exit(0);
      });
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

export { influxDatabase };
