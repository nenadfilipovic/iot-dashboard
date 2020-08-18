import Koa from 'koa';
import { koaServer } from './koa';

const koaLoader = async ({ koaApp }: { koaApp: Koa }): Promise<void> => {
  await koaServer({ app: koaApp });
  console.log('Server successfully loaded');
};

export { koaLoader };
