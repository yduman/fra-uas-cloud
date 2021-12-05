import { ErrorResult } from "../types";
import { BaseError } from "./base.error";

export class ForbiddenError extends BaseError {
  public readonly status = 401;

  constructor() {
    super("Unauthorized Request");
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  getErrors(): ErrorResult[] {
    return [{ message: "Unauthorized Request" }];
  }
}
