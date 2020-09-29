import { getConnectionManager } from 'typeorm';
import config from 'config';

import { Device } from '../components/device';

const host: string = config.get('db.host');
const port: number = config.get('db.port');
const username: string = config.get('db.username');
const password: string = config.get('db.password');
const database: string = config.get('db.database');

const connectionManager = getConnectionManager();

const mysqlDatabase = connectionManager.create({
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: [Device],
  synchronize: true,
  dropSchema: true,
  logging: false,
});

export { mysqlDatabase };
