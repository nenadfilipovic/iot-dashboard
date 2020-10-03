process.env['NODE_CONFIG_DIR'] = '../../config';

import http from 'http';
import config from 'config';

import { mysqlDatabaseConnection } from './database';
import { app } from './app';
import { appLogger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';
import { amqpConnection } from './event-bus';
import { userRemovedSubscriber } from './event-bus/subscribers';

const serviceName: string = config.get('services.device.name');
const servicePort: number = config.get('services.device.port');
const mysqlHost: string = config.get('mysql.host');
const mysqlPort: number = config.get('mysql.port');
const mysqlUsername: string = config.get('mysql.username');
const mysqlPassword: string = config.get('mysql.password');
const mysqlDatabaseName: string = config.get('services.device.mysql.name');

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

const mysqlDatabase = mysqlDatabaseConnection({
  type: 'mysql',
  host: mysqlHost,
  port: mysqlPort,
  username: mysqlUsername,
  password: mysqlPassword,
  database: mysqlDatabaseName,
});

class Server {
  public static async startServer() {
    try {
      appLogger.info(`${serviceName} service is starting`);

      /**
       * Load server, db, etc
       */

      await mysqlDatabase.connect();

      appLogger.info('Database connection established successfully');

      /**
       * Start event bus
       */

      await amqpConnection.initialized;

      /**
       * Start server after everything is ready
       */

      httpServer.listen(servicePort, () =>
        appLogger.info(`Server successfully started at port ${servicePort}`),
      );

      /**
       * Start event listeners
       */

      userRemovedSubscriber();
    } catch (error) {
      this.terminateServer(serviceName, error);
    }
  }

  public static async stopServer() {
    try {
      appLogger.info(`${serviceName} service is stopping`);

      await mysqlDatabase.close();

      appLogger.info('Database connection successfully closed');

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
