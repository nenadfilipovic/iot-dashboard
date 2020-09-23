import KoaRouter from 'koa-router';
import config from 'config';

import {
  registerDevice,
  modifyDevice,
  removeDevice,
  getSingleDevice,
  getAllDevices,
  mqttAcl,
} from './device.controller';
import { validateToken } from '../services/jwt';

const prefix: string = config.get('service.prefix');

const router = new KoaRouter({ prefix });

router
  .get('/', validateToken, getAllDevices)

  .get('/:id', validateToken, getSingleDevice)

  .post('/', validateToken, registerDevice)

  .post('/mqtt/acl', mqttAcl)

  .patch('/:id', validateToken, modifyDevice)

  .delete('/:id', validateToken, removeDevice);

export { router };
