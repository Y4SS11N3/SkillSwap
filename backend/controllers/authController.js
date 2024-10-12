const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');

const authController = {
  /**
   * Registers a new user.
   * @async
   * @function signup
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async signup(req, res, next) {
    try {
      const { name, email, password, bio } = req.body;
      
      const userData = { name, email, password };
      if (bio) {
        userData.bio = bio;
      }
      
      const user = await User.create(userData);
      
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(201).json({ 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          bio: user.bio 
        }, 
        token 
      });
    } catch (error) {
      console.error('Signup error:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors.map(e => e.message) });
      }
      next(error);
    }
  },

  /**
   * Authenticates a user and returns a token.
   * @async
   * @function login
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.validatePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;