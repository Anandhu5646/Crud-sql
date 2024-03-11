
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwtSecret.js';
import User from '../models/User.js';
class AuthHelper {
  static async registerUser(name, email, password,profilePic,role) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const userData = {
        name,
        email,
        password: hashedPassword,
        profilePic,
        role
      };

      if (profilePic) {
        userData.profilePic = profilePic;
      }
      if (req?.user && req?.user?.role === 'admin') {
        userData.role = role || 'user'; 
      } else {
        userData.role = 'user'; 
      }

      const user = await User.create(userData);
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    
      return { token };
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Invalid email');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error('Invalid password');
      }


      const payload = {
        user: {
          id: user.id,
          role: user.role,
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
