import http from 'http';
import config from 'config';

import { db } from './core/database';
import { app } from './core/app';
import { logger } from './utils/logger';

const serviceName: string = config.get('service.name');
const servicePort: string = config.get('service.port');

const startServer = async () => {
  logger.info(`🙏 ${serviceName} service is starting.`);

  /**
   * Load server, db, etc...
   */

  db.authenticate().then(() => {
    logger.info('😄 Database connection established successfully.');
  });

  http
    .createServer(app.callback())
    .listen(servicePort, () =>
      logger.info(`😄 Server successfully started at port ${servicePort}.`),
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
      `🔥 Unable to start ${serviceName} service, please read error below.`,
    );
    logger.error(error);
    process.exit(1);
  });
