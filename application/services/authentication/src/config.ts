import joi from 'joi';

const configSchema = joi
  .object({
    NODE_ENV: joi.string().valid('development', 'production').required(),
    SERVICE_NAME: joi.string().required(),
    SERVICE_PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    MYSQL_HOST: joi.string().required(),
    MYSQL_USER: joi.string().required(),
    MYSQL_PASSWORD: joi.string().required(),
    MYSQL_DATABASE: joi.string().required(),
  })
  .unknown();

const { error, value: validConfig } = configSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const {
  environment,
  serviceName,
  servicePort,
  jwtSecret,
  mysqlHost,
  mysqlUser,
  mysqlPassword,
  mysqlDatabase,
} = {
  environment: validConfig.NODE_ENV,
  serviceName: validConfig.SERVICE_NAME,
  servicePort: validConfig.SERVICE_PORT,
  jwtSecret: validConfig.JWT_SECRET,
  mysqlHost: validConfig.MYSQL_HOST,
  mysqlUser: validConfig.MYSQL_USER,
  mysqlPassword: validConfig.MYSQL_PASSWORD,
  mysqlDatabase: validConfig.MYSQL_DATABASE,
};
