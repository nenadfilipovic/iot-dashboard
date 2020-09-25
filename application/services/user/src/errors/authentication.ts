import { BaseError } from './base';

class AuthenticationError extends BaseError {
  constructor() {
    super('Action requires authentication!', 401);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export { AuthenticationError };
