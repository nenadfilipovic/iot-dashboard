import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(5).required(),
  channel: Joi.string().alphanum().min(7).required(),
  description: Joi.string(),
  type: Joi.string().valid('esp32', 'esp8266'),
});

const modifySchema = Joi.object({
  name: Joi.string().alphanum().min(5),
  description: Joi.string(),
  type: Joi.string().valid('esp32', 'esp8266'),
});

export { registerSchema, modifySchema };
