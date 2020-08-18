import { BaseError } from './base';

class NotAuthorizedError extends BaseError {
  statusCode = 401;
  constructor() {
    super('Not Authorized');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  printError(): { message: string } {
    return { message: 'Not Authorized' };
  }
}

export { NotAuthorizedError };
