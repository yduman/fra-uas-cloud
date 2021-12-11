import { ValidationError } from "express-validator";
import { BaseError } from "./base.error";

export class RequestValidationError extends BaseError {
  public readonly status = 400;

  constructor(private errors: ValidationError[]) {
    super("Invalid request body");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  getErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
