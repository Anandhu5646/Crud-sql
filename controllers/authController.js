import AuthHelper from '../helper/authHelper.js';


export const register = async (req, res) => {

  try {
  const { name, email, password ,role} = req.body;
  console.log(name, email,password);
  const profilePic = req.file ? req.file.path : null;

  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ errors: [{ msg: 'Invalid input data' }] });
  }

    const result = await AuthHelper.registerUser(name, email, password, profilePic, role);
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ errors: [{ msg: 'Invalid email' }] });
  }
 
  if (!password) {
    return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
  }

  try {
    const result = await AuthHelper.loginUser(email, password);
    console.log(result, 'login successful');
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


