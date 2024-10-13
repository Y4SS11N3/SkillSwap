const { Message, Exchange, User } = require('../models/associations');
const { Op } = require('sequelize');

const messageController = {
  async createMessage(req, res, next) {
    try {
      const { content, exchangeId } = req.body;
      const senderId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id: exchangeId,
          [Op.or]: [{ requesterId: senderId }, { providerId: senderId }]
        }
      });

      if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found or you are not a participant' });
      }

      const message = await Message.create({
        content,
        exchangeId,
        senderId
      });

      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  },

  async getMessages(req, res, next) {
    try {
      const { exchangeId } = req.params;
      const userId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id: exchangeId,
          [Op.or]: [{ requesterId: userId }, { providerId: userId }]
        }
      });

      if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found or you are not a participant' });
      }

      const messages = await Message.findAll({
        where: { exchangeId },
        include: [
          { model: User, as: 'sender', attributes: ['id', 'name'] }
        ],
        order: [['createdAt', 'ASC']]
      });

      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = messageController;