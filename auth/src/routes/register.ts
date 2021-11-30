import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

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
  (req: Request, res: Response) => {
    handleValidationErrors(req, res);
    const { email, password } = req.body;

    console.log("Creating user");
    res.send({});
  }
);

function handleValidationErrors(req: Request, res: Response) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new RequestValidationError(validationErrors.array());
  }
}

export { router as registerRouter };
