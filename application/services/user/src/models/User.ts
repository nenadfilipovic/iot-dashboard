import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

import { db } from '../db/sequelize';
import { logger } from '../utils/logger';
import { User } from '../types';

const User = db.define<User>(
  'User',
  {
    userUniqueIndentifier: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: {
        name: 'id',
        msg: 'User ID already in use!',
      },
    },

    userFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: {
      //     msg: 'Name length should be between 3 and 25 characters!',
      //     args: [3, 25],
      //   },
      //   isAlpha: {
      //     msg: 'Name should only consist of letters!',
      //   },
      // },
    },

    userLastName: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: {
      //     msg: 'Surname length should be between 3 and 25 characters!',
      //     args: [3, 25],
      //   },
      //   isAlpha: {
      //     msg: 'Surname should only consist of letters!',
      //   },
      // },
    },

    userEmailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'Email address already in use!',
      },
      // validate: {
      //   isEmail: {
      //     msg: 'Email address is not in valid email format!',
      //   },
      //   isLowercase: true,
      // },
    },

    userHandle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'handle',
        msg: 'User handle already in use!',
      },
      // validate: {
      //   len: {
      //     msg: 'Username length should be between 3 and 25 characters!',
      //     args: [3, 25],
      //   },
      //   isAlphanumeric: {
      //     msg: 'Username should only consist of letters and numbers!',
      //   },
      // },
    },

    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: {
      //     msg: 'The password length should be between 7 and 100 characters!',
      //     args: [7, 100],
      //   },
      // },
    },
  },
  {},
);

// TODO - fix
User.beforeSave(async (user) => {
  if (user.userPassword && user.changed('userPassword')) {
    user.userPassword = await bcrypt.hash(user.userPassword, 12);
  }
});

User.prototype.passwordValidator = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.userPassword);
};

// TODO - fix
User.sync({ force: true })
  .then(() => logger.info('Data model is in sync.'))
  .then(async () => {
    await User.create({
      userHandle: 'admin',
      userFirstName: 'dashboard',
      userLastName: 'user',
      userEmailAddress: 'admin@home.com',
      userPassword: 'adminpassword',
    }).then(() => logger.info('Admin user created.'));
  });

export { User };
