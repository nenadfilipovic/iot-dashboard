import { Sequelize } from 'sequelize';
import config from 'config';

const dbHost: string = config.get('db.host');
const dbUser: string = config.get('db.user');
const dbPassword: string = config.get('db.password');
const dbName: string = config.get('db.name');

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  define: {
    timestamps: true,
  },
  logging: process.env.NODE_ENV === 'development',
});

export { db };
