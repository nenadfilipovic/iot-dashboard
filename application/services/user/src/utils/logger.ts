import { createLogger, format, transports } from 'winston';

const { combine, colorize, timestamp, printf, prettyPrint, errors } = format;

/**
 * Enable logging of error stack: https://github.com/winstonjs/winston/issues/1338#issuecomment-482784056
 */

const loggerFormat = printf(({ level, message, timestamp, stack }) => {
  if (stack) {
    return `${timestamp} - [${level}] : ${message} \n ${stack}`;
  }

  return `${timestamp} - [${level}] : ${message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  exitOnError: true,
  handleExceptions: true,
  format: combine(
    colorize(),
    timestamp(),
    prettyPrint(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    errors({ stack: true }),
    loggerFormat,
  ),
  transports: [new transports.Console()],
});

export { logger };
