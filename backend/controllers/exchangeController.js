const { Exchange, User, Skill, UserSkill } = require('../models/associations');
const sequelize = require('../database/connection');
const { Op } = require('sequelize');

/**
 * Controller for handling exchange operations
 * @type {Object}
 */
const exchangeController = {
  /**
   * Create a new exchange
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async createExchange(req, res, next) {
    try {
    const { providerId, requesterSkillId, providerSkillId } = req.body;
    const requesterId = req.user.id;
    
    const requesterSkill = await UserSkill.findOne({
        where: {
        userId: requesterId,
        skillId: requesterSkillId,
        isKnownSkill: true
        }
    });
    
    if (!requesterSkill) {
        return res.status(400).json({ message: 'You can only offer skills you have' });
    }
    
    const exchange = await Exchange.create({
        requesterId,
        providerId,
        requesterSkillId,
        providerSkillId,
        status: 'pending'
    });
    
    res.status(201).json(exchange);
    } catch (error) {
    next(error);
    }
  },

  /**
   * Get all exchanges for the current user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async getExchanges(req, res, next) {
    try {
      const userId = req.user.id;
      const exchanges = await Exchange.findAll({
        where: {
          [Op.or]: [{ requesterId: userId }, { providerId: userId }]
        },
        include: [
          { model: User, as: 'requester', attributes: ['id', 'name'] },
          { model: User, as: 'provider', attributes: ['id', 'name'] },
          { model: Skill, as: 'requesterSkill', attributes: ['id', 'name'] },
          { model: Skill, as: 'providerSkill', attributes: ['id', 'name'] }
        ]
      });
      res.json(exchanges);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update the status of an exchange
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async updateExchangeStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id,
          [Op.or]: [{ requesterId: userId }, { providerId: userId }]
        }
      });

      if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found' });
      }

      if (exchange.providerId === userId && ['accepted', 'declined'].includes(status)) {
        exchange.status = status;
      } else if (exchange.requesterId === userId && status === 'canceled') {
        exchange.status = status;
      } else if (exchange.providerId === userId && status === 'completed' && exchange.status === 'accepted') {
        exchange.status = status;
      } else {
        return res.status(400).json({ message: 'Invalid status update' });
      }

      await exchange.save();

      res.json(exchange);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Cancel an exchange
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async cancelExchange(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id,
          requesterId: userId,
          status: 'pending'
        }
      });

      if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found or cannot be canceled' });
      }

      exchange.status = 'canceled';
      await exchange.save();

      res.json(exchange);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Search for skills
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async searchSkills(req, res, next) {
    try {
      const { query } = req.query;
      const currentUserId = req.user.id;

      const skills = await Skill.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } },
            { description: { [Op.iLike]: `%${query}%` } },
            sequelize.where(sequelize.cast(sequelize.col('Skill.category'), 'text'), { [Op.iLike]: `%${query}%` })
          ]
        },
        include: [{
          model: User,
          through: {
            model: UserSkill,
            where: { isKnownSkill: true }
          },
          where: {
            id: { [Op.ne]: currentUserId }
          },
          attributes: ['id', 'name'],
          required: true
        }],
        attributes: ['id', 'name', 'description', 'category']
      });

      const flattenedSkills = skills.map(skill => ({
        id: skill.id,
        name: skill.name,
        description: skill.description,
        category: skill.category,
        userId: skill.Users[0]?.id,
        userName: skill.Users[0]?.name
      }));

      res.json(flattenedSkills);
    } catch (error) {
      console.error('Error in searchSkills:', error);
      next(error);
    }
  },

  /**
   * Get details of a specific exchange
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async getExchangeDetails(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id,
          [Op.or]: [{ requesterId: userId }, { providerId: userId }]
        },
        include: [
          { model: User, as: 'requester', attributes: ['id', 'name'] },
          { model: User, as: 'provider', attributes: ['id', 'name'] },
          { model: Skill, as: 'requesterSkill', attributes: ['id', 'name'] },
          { model: Skill, as: 'providerSkill', attributes: ['id', 'name'] }
        ]
      });

      if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found' });
      }

      res.json(exchange);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = exchangeController;