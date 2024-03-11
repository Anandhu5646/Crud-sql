import { validationResult } from 'express-validator';
import AuthHelper from '../helper/authHelper.js';

class AuthController {
  static async register(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const base64ProfilePic = req.body.profilePic || null;
    console.log(name, email, password);
    try {
      const result = await AuthHelper.registerUser(name, email, password, base64ProfilePic);
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }

  static async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const result = await AuthHelper.loginUser(email, password);
      console.log(result,'result login');
      res.json(result);
      console.log('login successfull');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
}

export default AuthController;
