import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User, UserDocument } from "../models/user.model";
import { validateEmail, validatePassword } from "./validators";
import { RequestValidationError } from "../errors/validation.error";
import { BadRequestError } from "../errors/bad-request.error";

const router = express.Router();

router.post(
  "/api/users/register",
  [validateEmail(), validatePassword()],
  async (req: Request, res: Response) => {
    handleValidationErrors(req, res);

    const { email, password } = req.body;
    await handleDuplicateEmail(email);

    const user = await createUser(email, password);
    const token = createToken(user);

    req.session = { jwt: token };
    res.status(201).send(user);
  }
);

function createToken(user: UserDocument) {
  return jwt.sign({ id: user.id, email: user.email }, "somesecret");
}

async function createUser(
  email: string,
  password: string
): Promise<UserDocument> {
  const user = User.build({ email, password });
  await user.save();
  return user;
}

async function handleDuplicateEmail(email: string) {
  const duplicateUser = await User.findOne({ email });
  if (duplicateUser) {
    throw new BadRequestError("Email is already being used");
  }
}

function handleValidationErrors(req: Request, res: Response) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }
}

export { router as registerRouter };
