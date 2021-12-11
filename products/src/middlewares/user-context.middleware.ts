import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserContext {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserContext;
    }
  }
}

export function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserContext;
    req.currentUser = payload;
  } catch (err) {}

  next();
}
