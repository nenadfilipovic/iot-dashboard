import { CustomError } from './BaseError';

class AuthenticationError extends CustomError {
  constructor(public description: string) {
    super('Action requires authentication!', 401);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export { AuthenticationError };
