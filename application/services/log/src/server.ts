import Koa from 'koa';
import { koaLoader } from './loaders';
import { config } from './env/config';
import { appLogger } from './utils/logger/pino';

const { serviceName, servicePort, jwtSecret } = config;

const startServer = async () => {
  try {
    appLogger.info('Checking for configuration');
    if (!jwtSecret) {
      throw new Error('In order to start the service please provide JWT secret');
    }
    appLogger.info(`${serviceName} service is starting`);
    const app = new Koa();
    await koaLoader({ koaApp: app });
    app.listen(servicePort, () => {
      appLogger.info(`${serviceName} service is running on port ${servicePort}`);
    });
  } catch (error) {
    appLogger.error(error);
  }
};

startServer();
