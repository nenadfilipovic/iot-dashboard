import { DataTypes, Model } from 'sequelize';

import { db } from '../core/database';
import { logger } from '../utils/logger';

enum Type {
  'esp32',
  'esp8266',
  'uno',
  'nano',
}

export interface DeviceAttributes extends Model {
  id: string;
  owner: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  type: Type;
  isActive: boolean;
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
        msg: 'Two devices with same identification string can not exist!',
      },
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          msg: 'Provided owner identification is not in valid format!',
          args: 4,
        },
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
        isAlphanumeric: {
          msg: 'Name must contain only alphanumeric characters!',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: {
          msg: 'Description can not contain more than 500 characters!',
          args: [0, 500],
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
    type: {
      type: DataTypes.ENUM('esp32', 'esp8266', 'arduino', 'uno', 'nano'),
      allowNull: false,
      validate: {
        isIn: {
          msg: 'Device type can only be esp32, esp8266, uno or nano!',
          args: [['esp32', 'esp8266', 'uno', 'nano']],
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
      // TODO - Need to fix this
      validCoordinates() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error(
            'Either provide both latitude and longitude or none!',
          );
        }
      },
    },
  },
);

Device.sync({ force: true })
  .then(() => {
    logger.info('👍 Data model is in sync.');
  })
  .catch((error) => {
    throw new Error(error);
  });

export { Device };
