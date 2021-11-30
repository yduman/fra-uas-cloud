import { ErrorResult } from "../types";

export abstract class BaseError extends Error {
  abstract status: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract getErrors(): ErrorResult[];
}
