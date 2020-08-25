import joi from 'joi';

const createDevice = joi.object({
  userId: joi.string().trim().required(),
  name: joi.string().alphanum().min(3).max(10).required(),
  description: joi.string().max(50),
  locationLat: joi.number(),
  locationLong: joi.number(),
  type: joi.string().valid('esp32', 'esp8266', 'arduino').required(),
  status: joi.string().valid('active', 'disabled').required(),
});

export { createDevice };
