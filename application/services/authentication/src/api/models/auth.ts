import { DataTypes } from 'sequelize';

import { db } from '../../bin/database';
import { appLogger } from '../../utils/logger';

const Authentication = db.define(
  'authentication',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'disabled'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {},
);

Authentication.sync({ force: true }).then(() => {
  appLogger.info('👍 Data model is in sync.');
});

export { Authentication };
