import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { User } from "../models/user.model";
import { RequestValidationError } from "../errors/validation.error";
import { BadRequestError } from "../errors/bad-request.error";

const router = express.Router();

router.post(
  "/api/users/register",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 32 })
      .withMessage("Password length has to be between 6 and 32 characters"),
  ],
  async (req: Request, res: Response) => {
    handleValidationErrors(req, res);

    const { email, password } = req.body;
    await handleDuplicateEmail(email);

    const user = User.build({ email, password });
    await user.save();
    res.status(201).send(user);
  }
);

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
