import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validation chains
    for (let validation of validations) {
      await validation.run(req);
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    console.log("Validation errors:", errors.array()); // Debug log
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator: ValidationChain[] = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
];

export const signupValidator: ValidationChain[] = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];


/* import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations : ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();      // move on to the next middleware function
            }
            return res.status(422).json({ errors: errors.array()});
    };
};

export const loginValidator : ValidationChain[] = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
    .trim()
    .isLength({ min : 6})
    .withMessage("Password should be at least 6 characters"),

];

export const signupValidator : ValidationChain[] = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];



 */