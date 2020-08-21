import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint, colorize, errors, printf } = format;

/**
 * Enable logging of error stack: https://github.com/winstonjs/winston/issues/1338#issuecomment-482784056
 */

const appLogger = createLogger({
  format: combine(
    errors({ stack: true }),
    colorize(),
    timestamp(),
    prettyPrint(),
    printf(({ timestamp, level, message, stack }) => {
      if (stack) {
        return `${timestamp} - ${level}: ${message} - ${stack}`;
      }
      return `${timestamp} - ${level}: ${message}`;
    }),
  ),
  transports: [new transports.Console()],
});

export { appLogger };
