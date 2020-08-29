import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import { db } from '../db/sequelize';
import { logger } from '../utils/logger';

export interface AuthAttributes extends Model {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  validPassword: (password: string) => Promise<boolean>;
}

const Authentication = db.define<AuthAttributes>(
  'Authentication',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: {
        name: 'id',
        msg: 'Two users with same identification string can not exist!',
      },
      validate: {
        isUUID: {
          msg: 'Provided user identification is not in valid format!',
          args: 4,
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'Two users with same email can not exist!',
      },
      validate: {
        isEmail: {
          msg: 'Provided email is not in valid email format!',
        },
        isLowercase: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'Password must be at least 6 characters long!',
          args: [6, 255],
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {},
);

Authentication.prototype.validPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

Authentication.sync({ force: true })
  .then(() => {
    logger.info('Data model is in sync.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { Authentication };
