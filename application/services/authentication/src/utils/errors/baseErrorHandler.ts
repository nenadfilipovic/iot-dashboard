import { appLogger } from '../logger';
import { BaseError } from './baseError';

process.on('unhandledRejection', (reason: string) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  baseErrorHandler.handleError(error);
  if (!baseErrorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

class BaseErrorHandler {
  public async handleError(error: Error): Promise<void> {
    await appLogger.error(error);
  }
  public isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const baseErrorHandler = new BaseErrorHandler();
