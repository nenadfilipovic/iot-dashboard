import joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().min(6).required(),
});

export { loginSchema };
