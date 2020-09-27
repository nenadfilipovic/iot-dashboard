class BaseError extends Error {
  public isOperational: boolean;
  public status: string;
  constructor(public message: string, public statusCode: number) {
    super(message);
    /**
     * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
     */
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this);
  }
}
export { BaseError };
