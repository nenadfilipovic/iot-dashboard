import { DataTypes, Model } from 'sequelize';

import { db } from '../db/sequelize';
import { logger } from '../utils/logger';

export interface DeviceAttributes extends Model {
  id: string;
  owner: string;
  name: string;
  description: string;
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
    owner: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          msg: 'Owner ID is not valid ID format!',
          args: 4,
        },
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
        isAlphanumeric: {
          msg: 'Name should only consist of letters!',
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
  },
  {
    validate: {},
  },
);

Device.sync({ force: true })
  .then(() => {
    logger.info('Data model is in sync.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { Device };
