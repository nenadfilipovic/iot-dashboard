class BaseError extends Error {
  constructor(public description: string, public isOperational: boolean) {
    super(description);
    /**
     * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
     */
    Object.setPrototypeOf(this, new.target.prototype);
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
export { BaseError };
