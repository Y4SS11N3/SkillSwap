const { User, Skill, UserSkill, Exchange } = require('../models/associations');
const { Op, fn, col } = require('sequelize');

/**
 * Controller for handling dashboard operations
 * @type {Object}
 */
const dashboardController = {
  /**
   * Retrieve dashboard data for the authenticated user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async getDashboardData(req, res, next) {
    try {
      const userId = req.user.id;

      // Get user's skills
      const userSkills = await UserSkill.findAll({
        where: { userId: userId },
        include: [{ model: Skill }]
      });

      // Get user's recent exchanges
      const exchanges = await Exchange.findAll({
        where: {
          [Op.or]: [{ requesterId: userId }, { providerId: userId }]
        },
        include: [
          { model: User, as: 'requester', attributes: ['id', 'name'] },
          { model: User, as: 'provider', attributes: ['id', 'name'] },
          { model: Skill, as: 'requesterSkill', attributes: ['id', 'name'] },
          { model: Skill, as: 'providerSkill', attributes: ['id', 'name'] }
        ],
        limit: 5,
        order: [['createdAt', 'DESC']]
      });

      // Get skill statistics by category
      const skillStats = await Skill.findAll({
        attributes: ['category', [fn('COUNT', col('id')), 'count']],
        group: ['category']
      });

      // Send the compiled dashboard data as JSON response
      res.json({
        userSkills,
        recentExchanges: exchanges,
        skillStats
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = dashboardController;