import { DataTypes, Model } from 'sequelize';

import { db } from '../../core/database';
import { logger } from '../../utils/logger';

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
    },
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    locationLat: {
      type: DataTypes.FLOAT,
    },
    locationLong: {
      type: DataTypes.FLOAT,
    },
    type: {
      type: DataTypes.ENUM('esp32', 'esp8266', 'arduino'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'disabled'),
      defaultValue: 'active',
      allowNull: false,
    },
  },
  {},
);

Device.sync({ force: true }).then(() => {
  logger.info('👍 Data model is in sync.');
});

export { Device };
