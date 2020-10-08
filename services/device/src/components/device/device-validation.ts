import Joi from 'joi';

import { Type } from './device-types';
import { BaseError } from '../../errors/base-error';

const deviceSchema = Joi.object({
  name: Joi.string().alphanum().min(5).label('Name'),
  channel: Joi.string()
    .alphanum()
    .min(7)
    .label('Channel')
    .when('$update', {
      is: Joi.boolean().valid(true).required(),
      then: Joi.forbidden(),
    }),
  description: Joi.string().label('Description'),
  type: Joi.string().valid(Type.esp32, Type.esp8266).label('Type'),
})
  .options({
    stripUnknown: true,
    abortEarly: false,
  })
  .error(
    (errors) => new BaseError(errors.map((error) => error).join(', '), 400),
  );

export { deviceSchema };
