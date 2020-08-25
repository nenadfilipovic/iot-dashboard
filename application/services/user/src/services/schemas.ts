import joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().trim().email().lowercase().required(),
  password: joi.string().trim().min(6).required(),
});

export { loginSchema };
