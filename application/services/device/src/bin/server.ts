import http from 'http';

import { app } from './app';
import { serviceName, servicePort } from '../config';
import { appLogger } from '../utils/logger';

const initialize = async () => {
  appLogger.info(`🙏 ${serviceName} service is starting.`);
  /**
   * Load server, db, etc...
   * Example: await db.initialize()
   */
  http
    .createServer(app.callback())
    .listen(servicePort, () =>
      appLogger.info(`😄 Server successfully started at port ${servicePort}.`),
    );
};

initialize()
  /**
   * Need to hack around server.address().port if i want to show port because:
   * https://github.com/microsoft/ConversationLearner-Samples/issues/269
   */
  .then(() => appLogger.info(`👍 ${serviceName} service is up and running.`))
  .catch((error) => {
    if (error) {
      appLogger.error('🔥 Unable to start service, read error below.');
      appLogger.error(error);
    }
  });
