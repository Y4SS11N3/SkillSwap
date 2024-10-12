const { Exchange, User, Skill } = require('../models/associations');
const { Op } = require('sequelize');

const exchangeController = {
  async createExchange(req, res, next) {
    try {
      const { providerId, requesterSkillId, providerSkillId } = req.body;
      const requesterId = req.user.id;

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

      exchange.status = status;
      await exchange.save();

      res.json(exchange);
    } catch (error) {
      next(error);
    }
  },

  async searchSkills(req, res, next) {
    try {
      const { query } = req.query;
      const skills = await Skill.findAll({
        where: {
          name: { [Op.iLike]: `%${query}%` }
        },
        include: [{
          model: User,
          through: { attributes: [] },
          attributes: ['id', 'name']
        }]
      });
      res.json(skills);
    } catch (error) {
      next(error);
    }
  },

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