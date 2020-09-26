import http from 'http';
import config from 'config';
import { Connection } from 'typeorm';

import { initDatabase } from './db/typeorm';
import { app } from './app';
import { logger } from './utils/logger';
import { errorHandler } from './errors/handler';
import { User } from './models/User';

const name: string = config.get('service.name');
const port: string = config.get('service.port');

const server = http.createServer(app.callback());

const database = initDatabase;

process.on('unhandledRejection', (reason: string) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    shutDown(database, server);
  }
});

const startServer = async () => {
  logger.info(`${name} service is starting...`);

  /**
   * Load server, db, etc...
   */

  database.then((connection) => {
    if (connection.isConnected)
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
        userPassword: 'adminpassword',
      })
      .orIgnore()
      .execute();

    server.listen(port, () =>
      logger.info(`Server successfully started at port ${port}.`),
    );
  });
};

startServer()
  .then()
  .catch((error) => {
    logger.error(`Unable to start ${name} service!`);
    throw new Error(error);
  });

process.on('SIGINT', () => {
  shutDown(database, server);
});

const shutDown = (database: Promise<Connection>, server: http.Server) => {
  database
    .then((connection) => {
      logger.info('Closing down database connection...');
      connection.close();
      server.close(() => {
        logger.info('Server shutting down...');
        process.exit(0);
      });
    })
    .catch(() => {
      process.exit(1);
    });
};
