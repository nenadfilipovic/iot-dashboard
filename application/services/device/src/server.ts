import http from 'http';
import config from 'config';

import { mysqlDatabaseConnection } from './database';
import { app } from './app';
import { logger } from './utils/logger';
import { ErrorHandler } from './errors/error-handler';

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
  private static mysqlDatabase = mysqlDatabaseConnection;

  public static async startServer(): Promise<void> {
    try {
      logger.info(`${name} service is starting`);

      /**
       * Load server, db, etc
       */

      await this.mysqlDatabase.connect();

      logger.info('Database connection established successfully');

      /**
       * Start server after everything is ready
       */

      this.httpServer.listen(port, () =>
        logger.info(`Server successfully started at port ${port}`),
      );
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

      logger.info('Database connection is closing');

      await this.mysqlDatabase.close();

      logger.info('Server is shutting down');

      this.httpServer.close((error) => {
        error ? process.exit(1) : process.exit(0);
      });
    } catch (error) {
      logger.error('Could not shut down service gracefully, exiting!');

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
