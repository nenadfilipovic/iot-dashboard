import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import { db } from '../services/sequelize';
import { logger } from '../utils/logger';

export interface UserAttributes extends Model {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
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
        msg: 'Two users with same identification string can not exist!',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'Name must be between 3 and 25 characters long!',
          args: [3, 25],
        },
        isAlpha: {
          msg: 'Name must contain only letters!',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: 'Last name must be between 3 and 25 characters long!',
          args: [3, 25],
        },
        isAlpha: {
          msg: 'Last name must contain only letters!',
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
    latitude: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          msg: 'Latitude can not be lower than -90!',
          args: [-90],
        },
        max: {
          msg: 'Latitude can not be higher than 90!',
          args: [90],
        },
      },
    },
    longitude: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          msg: 'Longitude can not be lower than -180!',
          args: [-180],
        },
        max: {
          msg: 'Longitude can not be lower than 180!',
          args: [180],
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    validate: {
      // TODO - Fix this validation
      locationValidator: function () {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error(
            'Either provide both latitude and longitude or none!',
          );
        }
      },
    },
  },
);

User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

User.sync({ force: true })
  .then(() => {
    logger.info('Data model is in sync.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { User };
