import { createConnection } from 'typeorm';
import config from 'config';

import { User } from '../models/User';

const type: 'mysql' = config.get('db.type');
const host: string = config.get('db.host');
const port: number = config.get('db.port');
const username: string = config.get('db.username');
const password: string = config.get('db.password');
const database: string = config.get('db.database');

const initDatabase = createConnection({
  type,
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
