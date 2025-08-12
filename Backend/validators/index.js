import { body } from "express-validator";

// User Registration Validator
export const userResgisterValidator = [
  body('fullname')
    .notEmpty().withMessage('Fullname is required')
    .isLength({ min: 3 }).withMessage('Fullname must be at least 3 characters long'),

  body('email')
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
    .withMessage('Password must contain at least one letter and one number'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm Password is required')
    .isLength({ min: 6 }).withMessage('Confirm Password must be at least 6 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is not valid"),

    body("password")
      .notEmpty().withMessage("Password cannot be empty"),
  ];
};

export { userLoginValidator };
