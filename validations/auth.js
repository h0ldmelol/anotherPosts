import { body } from "express-validator";

export const registerValidation = [
  body('email', 'wrong email').isEmail(),
  body('password', 'pass < 5 symbols').isLength({min: 5}),
  body('fullName', 'input name').isLength({min: 3}),
  body('avatarUrl', 'wrong day').optional().isURL()
];