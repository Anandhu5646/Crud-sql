

export const isAdmin = (req, res, next) => {
   
    const user = req?.user;

    if (!user || user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden. Admin role required.' });
    }
  
    next();
  };
  