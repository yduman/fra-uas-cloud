import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/validation.error";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }

  next();
}
