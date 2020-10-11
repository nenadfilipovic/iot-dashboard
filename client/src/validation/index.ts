import Joi from 'joi';
import { Type } from '../types';

const userSchema = Joi.object({
  handle: Joi.string()
    .alphanum()
    .min(5)
    .label('Handle')
    .when('$update', {
      is: Joi.boolean().valid(true).required(),
      then: Joi.forbidden(),
    })
    .when('$login', {
      is: Joi.boolean().valid(true).required(),
      then: Joi.required(),
    }),
  firstName: Joi.string().alphanum().min(3).label('First Name'),
  lastName: Joi.string().alphanum().min(3).label('Last Name'),
  emailAddress: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .label('Email'),
  password: Joi.string()
    .min(7)
    .strict()
    .label('Password')
    .when('$update', {
      is: Joi.boolean().valid(true).required(),
      then: Joi.forbidden(),
    })
    .when('$login', {
      is: Joi.boolean().valid(true).required(),
      then: Joi.required(),
    }),
}).options({
  stripUnknown: true,
  abortEarly: false,
});
export { userSchema };

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
}).options({
  stripUnknown: true,
  abortEarly: false,
});
export { deviceSchema };
