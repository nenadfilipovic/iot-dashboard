abstract class BaseError extends Error {
  abstract statusCode: number;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }
  abstract printError(): { message: string; statusCode?: number };
}

export { BaseError };
