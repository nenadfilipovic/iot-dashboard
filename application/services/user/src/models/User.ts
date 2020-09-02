import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import { db } from '../db/sequelize';
import { logger } from '../utils/logger';

export interface UserAttributes extends Model {
  id: string;
  name: string;
  surname: string;
  username: string;
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'Name length should be between 3 and 25 characters!',
          args: [3, 25],
        },
        isAlpha: {
          msg: 'Name should only consist of letters!',
        },
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'Surname length should be between 3 and 25 characters!',
          args: [3, 25],
        },
        isAlpha: {
          msg: 'Surname should only consist of letters!',
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'username',
        msg: 'Username already in use!',
      },
      validate: {
        len: {
          msg: 'Username length should be between 3 and 25 characters!',
          args: [3, 25],
        },
        isAlphanumeric: {
          msg: 'Username should only consist of letters and numbers!',
        },
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
  {},
);

User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

User.prototype.validPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

User.sync({ force: true })
  .then(async () => {
    logger.info('Data model is in sync.');
    await User.create({
      name: 'dashboard',
      surname: 'user',
      username: 'admin',
      email: 'admin@home.com',
      password: 'adminpassword',
    });
    logger.info('Default user created.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { User };
