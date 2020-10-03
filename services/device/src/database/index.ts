import { Connection, ConnectionOptions, getConnectionManager } from 'typeorm';

import { Device } from '../components/device';

const connectionManager = getConnectionManager();

const mysqlDatabaseConnection = (
  databaseConfig: ConnectionOptions,
): Connection => {
  return connectionManager.create({
    ...databaseConfig,
    entities: [Device],
    synchronize: true,
    dropSchema: true,
    logging: false,
  });
};

export { mysqlDatabaseConnection };
