import joi from 'joi';

const appConfigSchema = joi
  .object({
    SERVICE_NAME: joi.string().required(),
    SERVICE_PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    BASE_ROUTE: joi.string().required(),
  })
  .unknown();

const { error, value: validAppConfig } = appConfigSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const appConfig = {
  serviceName: validAppConfig.SERVICE_NAME,
  servicePort: validAppConfig.SERVICE_PORT,
  jwtSecret: validAppConfig.JWT_SECRET,
  baseRoute: validAppConfig.BASE_ROUTE,
};

export { appConfig };
