import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/base-error";
import { ErrorResponse } from "../types";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof BaseError) {
    return res
      .status(error.status)
      .send({ errors: error.getErrors() } as ErrorResponse);
  }

  res.status(500).send({
    errors: [{ message: "An unknown error occurred." }],
  } as ErrorResponse);
}
