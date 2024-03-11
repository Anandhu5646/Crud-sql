import express from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/authController.js';
import multer from 'multer';
const router = express.Router();


router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    
  ], 

  AuthController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  AuthController.login
);

export default router;
