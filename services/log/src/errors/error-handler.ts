import { appLogger } from '../utils/logger';
import { BaseError } from './base-error';

class ErrorHandler {
  public static async handleError(error: Error): Promise<void> {
    /**
     * Currently no need for await
     * but when we add logging to log file
     * it will be needed
     */

    await appLogger.error(error);
  }

  public static isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export { ErrorHandler };
