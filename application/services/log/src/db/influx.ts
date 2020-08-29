import * as Influx from 'influx';
import config from 'config';

const host: string = config.get('db.host');
const user: string = config.get('db.user');
const password: string = config.get('db.password');
const name: string = config.get('db.name');

const db = new Influx.InfluxDB({
  database: name,
  host,
  port: 8086,
  username: user,
  password: password,
});

export { db };
