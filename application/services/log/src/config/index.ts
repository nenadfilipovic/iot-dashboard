import joi from 'joi';

const configSchema = joi
  .object({
    SERVICE_NAME: joi.string().required(),
    SERVICE_PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
  })
  .unknown();

const { error, value: validConfig } = configSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const appConfig = {
  serviceName: validConfig.SERVICE_NAME,
  servicePort: validConfig.SERVICE_PORT,
  jwtSecret: validConfig.JWT_SECRET,
};

const dbConfig = {
  dbHost: validConfig.DB_HOST,
  dbUser: validConfig.DB_USER,
  dbPassword: validConfig.DB_PASSWORD,
  dbName: validConfig.DB_NAME,
};

export { appConfig, dbConfig };
