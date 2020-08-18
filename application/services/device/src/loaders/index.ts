import Koa from 'koa';
import { koaServer } from './koa';
import { appLogger } from '../utils/logger/pino';

const koaLoader = async ({ koaApp }: { koaApp: Koa }): Promise<void> => {
  await koaServer({ app: koaApp });
  appLogger.info('Server successfully loaded');
};

export { koaLoader };
