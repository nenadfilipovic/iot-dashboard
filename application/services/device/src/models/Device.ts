import { DataTypes } from 'sequelize';

import { db } from '../db/sequelize';
import { logger } from '../utils/logger';
import { Device } from '../types';

const Device = db.define<Device>(
  'Device',
  {
    deviceUniqueIndentifier: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: {
        name: 'id',
        msg: 'Device ID already in use!',
      },
    },
    deviceOwner: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          msg: 'User ID is not valid ID format!',
          args: 4,
        },
      },
    },
    deviceName: {
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
    deviceDescription: {
      type: DataTypes.STRING,
      validate: {
        len: {
          msg: 'Description length should be between 0 and 500 characters!',
          args: [0, 500],
        },
      },
    },
    deviceChannel: {
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
