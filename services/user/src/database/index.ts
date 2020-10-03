import { Connection, ConnectionOptions, getConnectionManager } from 'typeorm';

import { User } from '../components/user';

const connectionManager = getConnectionManager();

const mysqlDatabaseConnection = (
  databaseConfig: ConnectionOptions,
): Connection => {
  return connectionManager.create({
    ...databaseConfig,
    entities: [User],
    synchronize: true,
    dropSchema: true,
    logging: false,
  });
};

export { mysqlDatabaseConnection };
