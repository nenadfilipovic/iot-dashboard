import http from 'http';
import config from 'config';

import { database } from './services/influx';
import { app } from './app';
import { logger } from './utils/logger';

const name: string = config.get('service.name');
const port: string = config.get('service.port');

const startServer = async () => {
  logger.info(`${name} service is starting.`);

  /**
   * Load server, db, etc...
   */

  database
    .getDatabaseNames()
    .then((names) => logger.info(`Databases available: ${names}`))
    .then(() => logger.info('Database succesfuly started.'));

  http
    .createServer(app.callback())
    .listen(port, () =>
      logger.info(`Server successfully started at port ${port}.`),
    );
};

startServer()
  /**
   * Need to hack around server.address().port if i want to show port because:
   * https://github.com/microsoft/ConversationLearner-Samples/issues/269
   */

  .then()
  .catch((error) => {
    logger.error(`Unable to start ${name} service!`);
    throw new Error(error);
  });
