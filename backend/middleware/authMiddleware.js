const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

/**
 * Middleware to authenticate and authorize users based on JWT tokens.
 * 
 * This middleware performs the following steps:
 * 1. Extracts the JWT token from the Authorization header
 * 2. Verifies the token using the JWT_SECRET
 * 3. Finds the corresponding user in the database
 * 4. Attaches the user object to the request for use in subsequent middleware or routes
 *
 * @async
 * @function authMiddleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} If token is missing, invalid, or user is not found
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Check for the token in the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Find the user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    next(error);
  }
};

module.exports = authMiddleware;