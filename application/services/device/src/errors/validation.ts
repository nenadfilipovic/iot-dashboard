import { CustomError } from './custom';

class ValidationError extends CustomError {
  constructor(public errors: Error) {
    super('Error while validating provided data.', 400);
    this.description = errors.message;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { ValidationError };
