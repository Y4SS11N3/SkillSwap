const { User } = require('../models/associations');
const bcrypt = require('bcryptjs');
const { deleteUserSkills, deleteUserExchanges, deleteUserMessages } = require('../utils/userDeletionHelpers');

const profileController = {
  /**
   * Retrieves the profile information of the authenticated user.
   * @async
   * @function getProfile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'bio']
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      next(error);
    }
  },

  /**
   * Updates the profile information of the authenticated user.
   * @async
   * @function updateProfile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateProfile(req, res, next) {
    try {
      const { name, email, bio, currentPassword, newPassword } = req.body;
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update basic info
      if (name) user.name = name;
      if (email) user.email = email;
      if (bio !== undefined) user.bio = bio;

      // Update password if provided
      if (currentPassword && newPassword) {
        const isPasswordValid = await user.validatePassword(currentPassword);
        if (!isPasswordValid) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      }

      await user.save();

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio
        }
      });
    } catch (error) {
      console.error('Update profile error:', error);
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
   * Updates the profile picture of the authenticated user.
   * @async
   * @function updateProfilePicture
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateProfilePicture(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Assuming you're storing the file path in the database
      user.profilePicture = req.file.path;
      await user.save();

      res.json({
        message: 'Profile picture updated successfully',
        profilePicture: user.profilePicture
      });
    } catch (error) {
      console.error('Update profile picture error:', error);
      next(error);
    }
  },

  /**
  * Deletes the authenticated user's account.
  * @async
  * @function deleteAccount
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
  */
  async deleteAccount(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // check the password before deletion
      const { password } = req.body;
      if (!(await user.validatePassword(password))) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
  
      // delete associated data
      await deleteUserSkills(user.id);
      await deleteUserExchanges(user.id);
      await deleteUserMessages(user.id);
  
      // delete the user
      await user.destroy();
  
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Delete account error:', error);
      next(error);
    }
  }
};

module.exports = profileController;