const jwt = require('jsonwebtoken');
const { User } = require('../models');
const auth = require('../src/middleware/auth');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ email, password: hashedPassword });
        return res.status(201).json({ user: user });
    } catch (error) {
        return res.status(500).json({ error: 'User creation failed' });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ 
      where: { username },
      attributes: ['username', 'email', "password", "userId"],
     });

    if (!user) {
      return res.status(404).json({ error: 'Incorrect Data!' });
    }

    //const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password;
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect Data!' });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.userId }, 'your-secret-key', { expiresIn: '1h' });
    console.log('Token:', token);
    res.cookie('token', token, { 
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    console.log("user", user);
    res.json({ token, username: user.username, email: user.email });
    console.log("final");
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error test' });
  }
};

module.exports = {registerUser, loginUser};
