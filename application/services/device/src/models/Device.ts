import { DataTypes, Model } from 'sequelize';

import { db } from '../db/sequelize';
import { logger } from '../utils/logger';

export interface DeviceAttributes extends Model {
  id: string;
  user: string;
  name: string;
  description: string;
  topic: string;
}

const Device = db.define<DeviceAttributes>(
  'Device',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: {
        name: 'id',
        msg: 'Device ID already in use!',
      },
    },
    user: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          msg: 'User ID is not valid ID format!',
          args: 4,
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'name',
        msg: 'Device name already in use!',
      },
      validate: {
        len: {
          msg: 'Name length should be between 3 and 25 characters!',
          args: [3, 25],
        },
        isAlphanumeric: {
          msg: 'Name should only consist of letters and numbers!',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: {
          msg: 'Description length should be between 0 and 500 characters!',
          args: [0, 500],
        },
      },
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'topic',
        msg: 'Topic already in use!',
      },
      validate: {
        len: {
          msg: 'Topic length should be between 3 and 10 characters!',
          args: [0, 10],
        },
        isAlphanumeric: {
          msg: 'Name should only consist of letters and numbers!',
        },
      },
    },
  },
  {},
);

Device.sync({ force: true })
  .then(() => {
    logger.info('Data model is in sync.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { Device };
