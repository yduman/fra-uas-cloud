import { body } from "express-validator";

export function validateEmail() {
  return body("email").isEmail().withMessage("Email must be valid");
}

export function validatePassword() {
  return body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 32 })
    .withMessage("Password length has to be between 6 and 32 characters");
}
