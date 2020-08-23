import { Sequelize } from 'sequelize';

import { mysqlHost, mysqlUser, mysqlPassword, mysqlDatabase } from '../config';

const db = new Sequelize(
  `mysql://${mysqlUser}:${mysqlPassword}@${mysqlHost}:3306/${mysqlDatabase}`,
  {
    define: {
      timestamps: true,
    },
    logging: false,
  },
);

export { db };
