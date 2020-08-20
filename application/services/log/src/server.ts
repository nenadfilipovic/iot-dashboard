import http from 'http';

import { app } from './imports';
import { appConfig } from './config';
import { appLogger } from './utils';

const { serviceName, servicePort } = appConfig;

const initialize = async () => {
  appLogger.info(`🙏 ${serviceName} service is starting.`);

  /**
   * Load server, db, etc...
   */

  http
    .createServer(app.callback())
    .listen(servicePort, () => appLogger.info(`😄 Server successfully started at port ${servicePort}.`));
};

initialize()
  /**
   * Need to hack around server.address().port because: https://github.com/microsoft/ConversationLearner-Samples/issues/269
   */
  .then(() => appLogger.info(`👍 ${serviceName} service is up and running.`))
  .catch((error) => {
    if (error) {
      appLogger.error('🔥 Unable to start service, read error below.');
      appLogger.error(error);
    }
  });
