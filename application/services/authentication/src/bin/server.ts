import http from 'http';

import { app } from './app';
import { db } from './database';
import { serviceName, servicePort } from '../config';
import { appLogger } from '../utils/logger';

const startServer = async () => {
  appLogger.info(`🙏 ${serviceName} service is starting.`);

  /**
   * Load server, db, etc...
   */

  db.authenticate().then(() => {
    appLogger.info('😄 Database connection established successfully.');
  });

  http
    .createServer(app.callback())
    .listen(servicePort, () =>
      appLogger.info(`😄 Server successfully started at port ${servicePort}.`),
    );
};

startServer()
  /**
   * Need to hack around server.address().port if i want to show port because:
   * https://github.com/microsoft/ConversationLearner-Samples/issues/269
   */

  .then()
  .catch((error) => {
    appLogger.error(
      `🔥 Unable to start ${serviceName} service, please read error below.`,
    );
    appLogger.error(error);
  });
