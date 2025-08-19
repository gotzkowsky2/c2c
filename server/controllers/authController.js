const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

/**
 * POST /api/auth/register
 */
async function register(req, res) {
  try {
    const { firstName, lastName, email, password, isProvider, providerProfile } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const user = await User.create({ firstName, lastName, email, password, role: 'user', isProvider: !!isProvider, providerProfile });
    const token = generateToken(user._id);
    return res.status(201).json({
      user: { id: user._id, firstName, lastName, email, role: user.role, isProvider: user.isProvider },
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * POST /api/auth/login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    return res.json({
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, isProvider: user.isProvider },
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { register, login };


