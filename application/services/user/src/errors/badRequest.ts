import { BaseError } from './base';

class BadRequestError extends BaseError {
  constructor(public message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export { BadRequestError };
