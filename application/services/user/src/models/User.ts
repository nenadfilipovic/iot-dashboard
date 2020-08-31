import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import { db } from '../db/sequelize';
import { logger } from '../utils/logger';

export interface UserAttributes extends Model {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  validPassword: (password: string) => Promise<boolean>;
}

const User = db.define<UserAttributes>(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: {
        name: 'id',
        msg: 'User ID already in use!',
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'First name length should be between 3 and 25 characters!',
          args: [3, 25],
        },
        isAlpha: {
          msg: 'First name should only consist of letters!',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'Last name length should be between 3 and 25 characters!',
          args: [3, 25],
        },
        isAlpha: {
          msg: 'Last name should only consist of letters!',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'Email address already in use!',
      },
      validate: {
        isEmail: {
          msg: 'Email address is not in valid email format!',
        },
        isLowercase: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'The password length should be between 7 and 100 characters!',
          args: [7, 100],
        },
      },
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  },
);

User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

/**
 * Removing password from user object works for every action except creating user,
 * this is fix for that,
 * use after create hook to refresh user object:
 * https://stackoverflow.com/questions/27972271/sequelize-dont-return-password#comment109231194_48357983
 */

User.afterCreate(async (user) => {
  await user.reload();
});

User.prototype.validPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

User.sync({ force: false })
  .then(() => {
    logger.info('Data model is in sync.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { User };
