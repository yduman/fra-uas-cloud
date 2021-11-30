import { BaseError } from "./base-error";
import { ErrorResult } from "../types";

export class NotFoundError extends BaseError {
  public readonly status = 404;

  constructor() {
    super("Invalid route");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  getErrors(): ErrorResult[] {
    return [{ message: "Not Found" }];
  }
}
