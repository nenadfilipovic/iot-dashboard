import { CustomError } from './BaseError';

class BadRequestError extends CustomError {
  constructor(public description: string) {
    super('Bad Request!', 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export { BadRequestError };
