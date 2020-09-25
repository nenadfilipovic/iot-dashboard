import http from 'http';
import config from 'config';

import { db } from './db/sequelize';
import { app } from './app';
import { logger } from './utils/logger';
import { errorHandler } from './errors/handler';

const name: string = config.get('service.name');
const port: string = config.get('service.port');

process.on('unhandledRejection', (reason: string) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

const server = http.createServer(app.callback());

const database = db;

const startServer = async () => {
  logger.info(`${name} service is starting`);

  /**
   * Load server, db, etc...
   */

  database.authenticate().then(() => {
    logger.info('Database connection established successfully');

    server.listen(port, () =>
      logger.info(`Server successfully started at port ${port}`),
    );

    return server;
  });
};

startServer()
  .then()
  .catch((error) => {
    logger.error(`Unable to start ${name} service!`);
    throw new Error(error);
  });

process.on('SIGINT', function () {
  database
    .close()
    .then(() => {
      logger.info('Closing down database connection');
      server.close(() => {
        logger.info('Server shutting down');
        process.exit(0);
      });
    })
    .catch(() => {
      process.exit(1);
    });
});
