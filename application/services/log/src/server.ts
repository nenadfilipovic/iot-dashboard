import Koa from 'koa';
import { koaLoader } from './loaders';
import { log } from './logger';
import { config } from './environment';

const { serviceName, servicePort } = config;

const startServer = async () => {
  log.info('Checking for configuration');
  if (!serviceName) {
    throw new Error('Service name must be defined');
  }
  if (!servicePort) {
    throw new Error('Service port must be defined');
  }
  log.info(`${serviceName} service is starting`);
  const app = new Koa();
  await koaLoader({ koaApp: app });
  app.listen(servicePort, () => {
    log.info(`${serviceName} service is running on port ${servicePort}`);
  });
};

startServer().catch(({ message }) => {
  log.error(message);
});
