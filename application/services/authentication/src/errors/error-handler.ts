import { logger } from '../utils/logger';
import { CustomError } from './custom';

process.on('unhandledRejection', (reason: string) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

class ErrorHandler {
  public handleError(error: Error): void {
    logger.error(error);
  }
  public isTrustedError(error: Error): boolean {
    if (error instanceof CustomError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
