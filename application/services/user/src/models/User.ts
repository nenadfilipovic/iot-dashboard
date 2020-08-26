import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import { db } from '../core/database';
import { logger } from '../utils/logger';

export interface UserAttributes extends Model {
  userId: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  active: boolean;
}

const User = db.define<UserAttributes>(
  'User',
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'User name must be between 3 and 20 characters long',
          args: [3, 20],
        },
        isAlpha: {
          msg: 'User name can only contain letters',
        },
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'User last name must be between 3 and 20 characters long',
          args: [3, 20],
        },
        isAlpha: {
          msg: 'User last name can only contain letters',
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique',
        msg: 'Provided email is already in use',
      },
      validate: {
        isEmail: {
          msg: 'Email address is not in valid format',
        },
        isLowercase: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'Password must be at least 6 characters long',
          args: [6, 60],
        },
      },
    },

    location: {
      type: DataTypes.STRING,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {},
);

User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

User.sync({ force: true })
  .then(() => {
    logger.info('👍 Data model is in sync.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { User };
