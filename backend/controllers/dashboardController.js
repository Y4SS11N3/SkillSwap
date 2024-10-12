const { User, Skill, UserSkill, Exchange } = require('../models/associations');
const { Op } = require('sequelize');

const dashboardController = {
  async getDashboardData(req, res, next) {
    try {
      const userId = req.user.id;

      // Get user's skills
      const userSkills = await UserSkill.findAll({
        where: { UserId: userId },
        include: [{ model: Skill }]
      });

      // Get user's exchanges
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

      // Get skill statistics
      const skillStats = await Skill.findAll({
        attributes: ['category', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        group: ['category']
      });

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