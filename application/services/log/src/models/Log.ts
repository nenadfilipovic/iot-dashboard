import { DataTypes, Model } from 'sequelize';

import { db } from '../db/sequelize';
import { logger } from '../utils/logger';

export interface LogAttributes extends Model {
  id: string;
  user: string;
  device: string;
  temperature: number;
  pressure: number;
  humidity: number;
}

const Log = db.define<LogAttributes>(
  'Log',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: {
        name: 'id',
        msg: 'Log ID already in use!',
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
    device: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          msg: 'Device ID is not valid ID format!',
          args: 4,
        },
      },
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pressure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          msg: 'Pressure should not be negative!',
          args: [0],
        },
      },
    },
    humidity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          msg: 'Humidity should not be negative!',
          args: [0],
        },
      },
    },
  },
  {
    validate: {},
  },
);

Log.sync({ force: true })
  .then(() => {
    logger.info('Data model is in sync.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { Log };
