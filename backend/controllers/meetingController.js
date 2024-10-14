const { Exchange } = require('../models/associations');
const { Op } = require('sequelize');
const { generateJitsiLink } = require('../utils/jitsiUtils');
const sequelize = require('../database/connection');

const meetingController = {
  async requestMeeting(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const { exchangeId } = req.params;
      const userId = req.user.id;

      const exchange = await Exchange.findOne({
        where: { 
          id: exchangeId,
          [Op.or]: [{ requesterId: userId }, { providerId: userId }],
          status: 'accepted'
        },
        lock: transaction.LOCK.UPDATE,
        transaction
      });

      if (!exchange) {
        await transaction.rollback();
        return res.status(404).json({ message: 'Exchange not found or not eligible for meeting request' });
      }

      if (exchange.meetingRequestStatus !== 'none') {
        await transaction.rollback();
        return res.status(400).json({ message: 'A meeting request is already pending or accepted for this exchange' });
      }

      exchange.meetingRequestStatus = 'requested';
      exchange.meetingLink = null;
      await exchange.save({ transaction });

      await transaction.commit();
      res.json(exchange);
    } catch (error) {
      await transaction.rollback();
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
          [Op.or]: [{ requesterId: userId }, { providerId: userId }],
          status: 'accepted',
          meetingRequestStatus: 'requested'
        }
      });
  
      if (!exchange) {
        console.log('Exchange not found or not eligible for accepting meeting:', { exchangeId, userId });
        return res.status(404).json({ message: 'Exchange not found, user not authorized, or no pending meeting request' });
      }
  
      exchange.meetingRequestStatus = 'accepted';
      exchange.meetingLink = generateJitsiLink(exchange.id);
      await exchange.save();
  
      console.log('Meeting accepted successfully:', { exchangeId, userId });
      res.json(exchange);
    } catch (error) {
      console.error('Error in acceptMeeting:', error);
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
  },

  async getMeetingStatus(req, res, next) {
    try {
      const exchangeId = req.params?.exchangeId || req;
      const userId = req.user?.id || res;
  
      const exchange = await Exchange.findOne({
        where: { 
          id: exchangeId,
          [Op.or]: [{ requesterId: userId }, { providerId: userId }],
          status: 'accepted'
        }
      });
  
      if (!exchange) {
        if (next) {
          return res.status(404).json({ message: 'Exchange not found or not accessible' });
        } else {
          throw new Error('Exchange not found or not accessible');
        }
      }
  
      const status = exchange.meetingRequestStatus;
  
      if (next) {
        res.json({ status });
      } else {
        return status;
      }
    } catch (error) {
      if (next) {
        next(error);
      } else {
        throw error;
      }
    }
  },
};

module.exports = meetingController;