import { BaseError } from "./base-error";

export class DBConnectionError extends BaseError {
  public readonly status = 500;
  private readonly reason = "Error connecting to the database";

  constructor() {
    super("DB connection error");
    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  getErrors() {
    return [{ message: this.reason }];
  }
}
