import http from 'http';
import config from 'config';

import { initDatabase } from './database';
import { app } from './app';
import { logger } from './utils/logger';
import { ErrorHandler } from './errors/ErrorHandler';
import { User } from './components/user';

const name: string = config.get('service.name');
const port: string = config.get('service.port');

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
  private static appDatabase = initDatabase;

  public static async startServer(): Promise<void> {
    try {
      logger.info(`${name} service is starting...`);

      /**
       * Load server, db, etc...
       */

      const connection = await this.appDatabase.connect();

      if (connection.isConnected) {
        logger.info('Database connection established successfully.');

        /**
         * Create default admin user...
         */

        connection
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            userHandle: 'admin',
            userFirstName: 'dashboard',
            userLastName: 'user',
            userEmailAddress: 'admin@home.com',
            userPassword: 'password',
          })
          .orIgnore()
          .execute();

        /**
         * Start server after everything is ready...
         */

        this.httpServer.listen(port, () =>
          logger.info(`Server successfully started at port ${port}.`),
        );
      }
    } catch (error) {
      logger.error(`Unable to start ${name} service!`);

      /**
       * In case something is wrong log error
       * and kill process...
       */

      logger.error(error);

      process.exit(1);
    }
  }

  public static async shutDownServer(): Promise<void> {
    try {
      logger.info(`${name} service is stopping...`);

      await this.appDatabase.close();

      if (!this.appDatabase.isConnected) {
        logger.info('Database connection is closed.');

        this.httpServer.close((error) => {
          logger.info('Server shutting down...');

          if (error) {
            process.exit(1);
          }

          process.exit(0);
        });
      }
    } catch (error) {
      logger.info('Could not shut down service gracefully, exiting...');

      /**
       * In case something is wrong log error
       * and kill process...
       */

      logger.error(error);

      process.exit(1);
    }
  }
}

Server.startServer();
