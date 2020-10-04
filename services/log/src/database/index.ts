import * as Influx from 'influx';
import config from 'config';

const host: string = config.get('influxdb.host');
const port: number = config.get('influxdb.port');
const username: string = config.get('influxdb.username');
const password: string = config.get('influxdb.password');
const database: string = config.get('services.log.influxdb.database');

const influxDatabase = new Influx.InfluxDB({
  host,
  port,
  username,
  password,
  database,
});

export { influxDatabase };
