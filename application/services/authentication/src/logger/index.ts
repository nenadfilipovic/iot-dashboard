import pino from 'pino';

const logger = pino({ prettyPrint: true });

const log = {
  info: (message: string): void => {
    logger.info(message);
  },
  error: (message: string): void => {
    logger.error(message);
  },
  debug: (message: string): void => {
    logger.debug(message);
  },
};

export { log };
