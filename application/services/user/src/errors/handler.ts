import { logger } from '../utils/logger';
import { BaseError } from './base';

class ErrorHandler {
  public async handleError(error: Error): Promise<void> {
    logger.error(error);
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
