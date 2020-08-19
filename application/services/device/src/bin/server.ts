import http from 'http';

import { app } from './app';
import { config } from '../config';
import { appLogger } from '../utils/logger';

const { serviceName, servicePort } = config.appConfig;

const startServer = async () => {
  /**
   * Load server, db, etc...
   */
  appLogger.info(`🙏 ${serviceName} service is starting.`);

  return http.createServer(app.callback()).listen(servicePort);
};

startServer()
  /**
   * Cannot use server.address().port because: https://github.com/microsoft/ConversationLearner-Samples/issues/269
   */
  .then(() => appLogger.info(`😄 Everything is OK, service is up and running.`))
  .catch((error) => {
    appLogger.error('🔥 Unable to start service, read error below 👇.');
    appLogger.error(error);
    process.exit();
  });
