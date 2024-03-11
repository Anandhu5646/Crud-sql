import User from '../models/User.js';

const adminController = {
  activateUser: async (req, res) => {
    try {
      
          const userId = req.params.userId;
          
          const user = await User.findByPk(userId);
            console.log(user,'user found');
          if (!user) {
            return res.status(404).json({ message: 'User not found.' });
          }
    
          user.isActive = true;
          await user.save();
    
          res.json({ message: 'User activated successfully.' });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  deactivateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      user.isActive = false;
      await user.save();

      res.json({ message: 'User deactivated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default adminController;
