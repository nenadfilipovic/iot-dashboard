import { getConnectionManager } from 'typeorm';
import config from 'config';

import { User } from '../components/user';

const host: string = config.get('db.host');
const port: number = config.get('db.port');
const username: string = config.get('db.username');
const password: string = config.get('db.password');
const database: string = config.get('db.database');

const connectionManager = getConnectionManager();

const initDatabase = connectionManager.create({
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: [User],
  synchronize: true,
  dropSchema: true,
  logging: false,
});

export { initDatabase };
