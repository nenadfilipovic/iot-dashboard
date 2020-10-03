import * as Influx from 'influx';
import { ISingleHostConfig } from 'influx';

const influxDatabaseConnection = (
  databaseConfig: ISingleHostConfig,
): Influx.InfluxDB => {
  return new Influx.InfluxDB({ ...databaseConfig });
};

export { influxDatabaseConnection };
