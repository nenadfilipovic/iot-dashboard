import { DataTypes, Model } from 'sequelize';

import { db } from '../../core/database';
import { logger } from '../../utils/logger';

enum Status {
  'active',
  'disabled',
}

export interface UserAttributes extends Model {
  userId: string;
  name: string;
  email: string;
  password: string;
  image: string;
  locationLat: number;
  locationLogn: number;
  status: Status;
}

const User = db.define<UserAttributes>(
  'User',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    locationLat: {
      type: DataTypes.FLOAT,
    },
    locationLong: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.ENUM('active', 'disabled'),
      defaultValue: 'active',
      allowNull: false,
    },
  },
  {},
);

User.sync({ force: true }).then(() => {
  logger.info('👍 Data model is in sync.');
});

export { User };
