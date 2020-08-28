import { Sequelize } from 'sequelize';
import config from 'config';

const host: string = config.get('db.host');
const user: string = config.get('db.user');
const password: string = config.get('db.password');
const name: string = config.get('db.name');

const db = new Sequelize(name, user, password, {
  host,
  dialect: 'mysql',
  define: {
    timestamps: true,
  },
  logging: false,
});

export { db };
