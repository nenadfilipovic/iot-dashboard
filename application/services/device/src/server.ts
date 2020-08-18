import Koa from 'koa';
import { koaLoader } from './loaders';
import { config } from './env/config';

const { serviceName, servicePort, jwtSecret } = config;

const startServer = async () => {
  try {
    console.log('Checking for configuration');
    if (!jwtSecret) {
      throw new Error('In order to start the service please provide JWT secret');
    }
    console.log(`${serviceName} service is starting`);
    const app = new Koa();
    await koaLoader({ koaApp: app });
    app.listen(servicePort, () => {
      console.log(`${serviceName} service is running on port ${servicePort}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
