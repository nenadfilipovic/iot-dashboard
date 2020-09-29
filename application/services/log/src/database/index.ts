import * as Influx from 'influx';
import config from 'config';

const host: string = config.get('db.host');
const port: number = config.get('db.port');
const username: string = config.get('db.username');
const password: string = config.get('db.password');
const database: string = config.get('db.database');

const influxDatabase = new Influx.InfluxDB({
  host,
  port,
  database,
  username,
  password,
});

export { influxDatabase };
