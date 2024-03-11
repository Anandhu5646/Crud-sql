
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwtSecret.js';
import User from '../models/User.js';
class AuthHelper {
  static async registerUser(name, email, password, base64ProfilePic) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const userData = {
        name,
        email,
        password: hashedPassword,
        profilePic: base64ProfilePic || null,
      };

      const user = await User.create(userData);
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
      console.log(token,'this is the token');
      return { token };
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      return { token };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthHelper;
