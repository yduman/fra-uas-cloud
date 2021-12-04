import { Request } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/validation.error";

export class RequestValidationService {
  static validateBody(req: Request) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new RequestValidationError(validationErrors.array());
    }
  }
}
