import { DataTypes, Model } from 'sequelize';

import { db } from '../core/database';
import { logger } from '../utils/logger';

enum Type {
  'esp32',
  'esp8266',
  'arduino',
}

enum Status {
  'active',
  'disabled',
}

export interface DeviceAttributes extends Model {
  userId: string;
  deviceId: string;
  name: string;
  description: string;
  locationLat: number;
  locationLong: number;
  type: Type;
  status: Status;
}

const Device = db.define<DeviceAttributes>(
  'Device',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUUID: {
          args: 4,
          msg:
            'User identification number must be in universally unique identifier v4 format',
        },
      },
    },
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUUID: {
          args: 4,
          msg:
            'Device identification number must be in universally unique identifier v4 format',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 10],
          msg: 'Device name must be between 3 and 10 characters long',
        },
        isAlphanumeric: {
          msg: 'Device name can only contain alphanumeric characters',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        max: {
          args: [50],
          msg: 'Device description can contain 50 characters at maximum',
        },
      },
    },
    latitude: {
      type: DataTypes.FLOAT(10, 6),
      validate: {
        isFloat: {
          msg: 'Location latitude must be in float format',
        },
        min: {
          args: [-90.0],
          msg: 'Location latitude minimum is -90.0',
        },
        max: {
          args: [90.0],
          msg: 'Location latitude maximum is 90.0',
        },
      },
    },
    longitude: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: {
          msg: 'Location longitude must be in float format',
        },
        min: {
          args: [-180.0],
          msg: 'Location longitude minimum is -180.0',
        },
        max: {
          args: [180.0],
          msg: 'Location longitude maximum is 180.0',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('esp32', 'esp8266', 'arduino'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['esp32', 'esp8266', 'arduino']],
          msg: 'Device type must be only "esp32", "esp8266" or "arduino"',
        },
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'disabled'),
      defaultValue: 'active',
      allowNull: false,
      validate: {
        isIn: {
          args: [['active', 'disabled']],
          msg: 'Device status must be either "active" or "disabled".',
        },
      },
    },
  },
  {
    validate: {
      validCoordinates() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error(
            'Either provide both latitude and longitude, or neither',
          );
        }
      },
    },
  },
);

Device.sync({ force: true }).then(() => {
  logger.info('👍 Data model is in sync.');
});

export { Device };
