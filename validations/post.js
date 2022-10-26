import { body } from "express-validator";

export const postCreateValidation = [
  body('title', 'need header').isLength({ min: 3 }).isString(),
  body('text', 'need text').isLength({ min: 10 }).isString(),
  body('tags', 'need tag').optional().isArray(),
  body('postUrl', 'wrong image url').optional().isString()
]