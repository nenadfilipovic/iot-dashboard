import { getConnectionManager } from 'typeorm';
import config from 'config';

import { Device } from '../components/device';

const host: string = config.get('mysql.host');
const port: number = config.get('mysql.port');
const username: string = config.get('mysql.username');
const password: string = config.get('mysql.password');
const database: string = config.get('services.device.mysql.database');

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
