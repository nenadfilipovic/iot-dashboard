import Joi from 'joi';

const registerSchema = Joi.object({
  handle: Joi.string().alphanum().min(5).required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

const modifySchema = Joi.object({
  firstName: Joi.string().min(3),
  lastName: Joi.string().min(3),
  password: Joi.string().min(7),
});

export { registerSchema, modifySchema };
