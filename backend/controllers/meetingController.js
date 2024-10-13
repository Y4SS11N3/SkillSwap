const { Exchange } = require('../models/associations');
const { Op } = require('sequelize');
const { generateJitsiLink } = require('../utils/jitsiUtils');

const meetingController = {
  async requestMeeting(req, res, next) {
    try {
      const { exchangeId } = req.params;
      const userId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id: exchangeId,
          requesterId: userId,
          status: 'accepted'
        }
      });

      if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found or not eligible for meeting request' });
      }

      exchange.meetingRequestStatus = 'requested';
      await exchange.save();

      res.json(exchange);
    } catch (error) {
      next(error);
    }
  },

  async acceptMeeting(req, res, next) {
    try {
      const { exchangeId } = req.params;
      const userId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id: exchangeId,
          providerId: userId,
          status: 'accepted',
          meetingRequestStatus: 'requested'
        }
      });

      if (!exchange) {
        return res.status(404).json({ message: 'Exchange not found or not eligible for meeting acceptance' });
      }

      exchange.meetingRequestStatus = 'accepted';
      exchange.meetingLink = generateJitsiLink(exchange.id);
      await exchange.save();

      res.json(exchange);
    } catch (error) {
      next(error);
    }
  },

  async getMeetingDetails(req, res, next) {
    try {
      const { exchangeId } = req.params;
      const userId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id: exchangeId,
          [Op.or]: [{ requesterId: userId }, { providerId: userId }],
          status: 'accepted',
          meetingRequestStatus: 'accepted'
        }
      });

      if (!exchange) {
        return res.status(404).json({ message: 'Meeting not found or not accessible' });
      }

      res.json({ meetingLink: exchange.meetingLink });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = meetingController;