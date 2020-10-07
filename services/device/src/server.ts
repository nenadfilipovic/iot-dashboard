import http from 'http';
import config from 'config';

import { mysqlDatabase } from './database';
import { app } from './app';
import { appLogger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';
import { amqpClient } from './event-bus';
import { userRemovedSubscriber } from './event-bus/subscribers';

const name: string = config.get('services.device.name');
const port: number = config.get('services.device.port');

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

      /**
       * Load server, db, etc
       */

      await mysqlDatabase.connect();

      appLogger.info('Database connection established successfully');

      /**
       * Start server after everything is ready
       */

      httpServer.listen(port, () =>
        appLogger.info(`Server successfully started at port ${port}`),
      );

      /**
       * Start event listeners
       */

      userRemovedSubscriber();
    } catch (error) {
      this.terminateServer(name, error);
    }
  }

  public static async stopServer() {
    try {
      appLogger.info(`${name} service is stopping`);

      await mysqlDatabase.close();

      appLogger.info('Database connection successfully closed');

      await amqpClient.close(); //

      httpServer.close((error) => {
        appLogger.info('Server is shutting down');
        error ? process.exit(1) : process.exit(0);
      });
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
