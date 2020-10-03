import KoaRouter from 'koa-router';
import config from 'config';

import {
  registerDevice,
  modifyDevice,
  removeDevice,
  getSingleDevice,
  getAllDevices,
  mqttAcl,
} from './device-controller';

import { validateToken } from '../../middlewares/jwt-middleware';

const prefix: string = config.get('services.device.prefix');

const deviceRouter = new KoaRouter({ prefix });

deviceRouter
  .get('/', validateToken, getAllDevices)

  .get('/:id', validateToken, getSingleDevice)

  .post('/', validateToken, registerDevice)

  .post('/mqtt/acl', mqttAcl)

  .patch('/:id', validateToken, modifyDevice)

  .delete('/:id', validateToken, removeDevice);

export { deviceRouter };
