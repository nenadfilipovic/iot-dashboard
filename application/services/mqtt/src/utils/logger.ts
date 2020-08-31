import { createLogger, format, transports } from 'winston';

const { combine, colorize, timestamp, printf, prettyPrint, errors } = format;

/**
 * Enable logging of error stack: https://github.com/winstonjs/winston/issues/1338#issuecomment-482784056
 */

const loggerFormat = printf(({ level, message, timestamp, stack }) => {
  let msg = `${timestamp} - [${level}] : ${message}`;

  if (stack) {
    msg = `${timestamp} - [${level}] : ${message} - ${stack}`;
  }

  return msg;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  exitOnError: true,
  handleExceptions: true,
  format: combine(
    colorize(),
    timestamp(),
    prettyPrint(),
    loggerFormat,
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    errors({ stack: true }),
  ),
  transports: [new transports.Console()],
});

export { logger };
