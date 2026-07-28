import { body } from "express-validator";

export const createUserValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long"),
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
];
