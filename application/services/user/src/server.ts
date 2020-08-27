import http from 'http';
import config from 'config';

import { db } from './core/database';
import { app } from './core/app';
import { logger } from './utils/logger';

const name: string = config.get('service.name');
const port: string = config.get('service.port');

const startServer = async () => {
  logger.info(`🙏 ${name} service is starting.`);

  /**
   * Load server, db, etc...
   */

  db.authenticate().then(() => {
    logger.info('😄 Database connection established successfully.');
  });

  http
    .createServer(app.callback())
    .listen(port, () =>
      logger.info(`😄 Server successfully started at port ${port}.`),
    );
};

startServer()
  /**
   * Need to hack around server.address().port if i want to show port because:
   * https://github.com/microsoft/ConversationLearner-Samples/issues/269
   */

  .then()
  .catch((error) => {
    logger.error(
      `🔥 Unable to start ${name} service, please read error below.`,
    );
    logger.error(error);
    process.exit(1);
  });
