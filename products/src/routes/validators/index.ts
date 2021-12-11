import { body } from "express-validator";

export function validateTitle() {
  return body("title").notEmpty().withMessage("Title cannot be empty");
}

export function validatePrice() {
  return body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0");
}
