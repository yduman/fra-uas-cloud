import { ErrorResult } from "../types";
import { BaseError } from "./base.error";

export class BadRequestError extends BaseError {
  public readonly status = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  getErrors(): ErrorResult[] {
    return [{ message: this.message }];
  }
}
