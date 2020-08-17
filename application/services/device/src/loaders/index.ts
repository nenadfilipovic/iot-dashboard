import Koa from 'koa';
import { koaServer } from './koa';
import { log } from '../logger';

const koaLoader = async ({ koaApp }: { koaApp: Koa }): Promise<void> => {
  await koaServer({ app: koaApp });
  log.info('Server successfully loaded');
};

export { koaLoader };
