import joi from 'joi';

const configSchema = joi
  .object({
    NODE_ENV: joi.string().valid('development', 'production').required(),
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

const { environment, serviceName, servicePort, jwtSecret } = {
  environment: validConfig.NODE_ENV,
  serviceName: validConfig.SERVICE_NAME,
  servicePort: validConfig.SERVICE_PORT,
  jwtSecret: validConfig.JWT_SECRET,
};

const { dbHost, dbName, dbPassword, dbUser } = {
  dbHost: validConfig.DB_HOST,
  dbUser: validConfig.DB_USER,
  dbPassword: validConfig.DB_PASSWORD,
  dbName: validConfig.DB_NAME,
};

export {
  environment,
  serviceName,
  servicePort,
  jwtSecret,
  dbHost,
  dbName,
  dbPassword,
  dbUser,
};
