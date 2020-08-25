import { DataTypes, Model } from 'sequelize';

import { db } from '../../core/database';
import { logger } from '../../utils/logger';

enum Status {
  'active',
  'disabled',
}

export interface AuthenticationAttributes extends Model {
  userId: string;
  email: string;
  password: string;
  status: Status;
}

const Authentication = db.define<AuthenticationAttributes>(
  'Authentication',
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
      defaultValue: 'active',
    },
  },
  {},
);

Authentication.sync({ force: true }).then(() => {
  logger.info('👍 Data model is in sync.');
});

export { Authentication };
