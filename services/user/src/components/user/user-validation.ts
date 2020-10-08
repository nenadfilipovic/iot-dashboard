import Joi from 'joi';

import { BaseError } from '../../errors/base-error';

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
  emailAddress: Joi.string().email().lowercase().label('Email'),
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
})
  .options({
    stripUnknown: true,
    abortEarly: false,
  })
  .error(
    (errors) => new BaseError(errors.map((error) => error).join(', '), 400),
  );

export { userSchema };
