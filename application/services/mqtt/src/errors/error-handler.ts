import { logger } from '../utils/logger';
import { BaseError } from './base-error';

class ErrorHandler {
  public static async handleError(error: Error): Promise<void> {
    await logger.error(error);
  }

  public static isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export { ErrorHandler };
