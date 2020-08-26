import { DataTypes, Model } from 'sequelize';

import { db } from '../core/database';
import { logger } from '../utils/logger';

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
      validate: {
        isUUID: {
          args: 4,
          msg:
            'User identification number must be in universally unique identifier v4 format.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email address is not in valid format.',
        },
        isLowercase: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 20],
          msg: 'Password must be between 6 and 20 characters long.',
        },
        isAlphanumeric: {
          msg: 'Password can only contain alphanumeric characters.',
        },
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'disabled'),
      defaultValue: 'active',
      validate: {
        isIn: {
          args: [['active', 'disabled']],
          msg: 'User status must be either "active" or "disabled".',
        },
      },
    },
  },
  {},
);

Authentication.sync({ force: true }).then(() => {
  logger.info('👍 Data model is in sync.');
});

export { Authentication };
