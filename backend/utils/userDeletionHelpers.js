const { UserSkill, Exchange, Message } = require('../models/associations');
const { Sequelize } = require('sequelize');

async function deleteUserSkills(userId) {
  await UserSkill.destroy({ where: { userId } });
}

async function deleteUserExchanges(userId) {
  await Exchange.destroy({ 
    where: { 
      [Sequelize.Op.or]: [
        { requesterId: userId },
        { providerId: userId }
      ]
    } 
  });
}

async function deleteUserMessages(userId) {
  const userExchanges = await Exchange.findAll({
    where: {
      [Sequelize.Op.or]: [
        { requesterId: userId },
        { providerId: userId }
      ]
    },
    attributes: ['id']
  });

  const exchangeIds = userExchanges.map(exchange => exchange.id);

  await Message.destroy({ 
    where: { 
      [Sequelize.Op.or]: [
        { senderId: userId },
        { exchangeId: { [Sequelize.Op.in]: exchangeIds } }
      ]
    } 
  });
}

module.exports = {
  deleteUserSkills,
  deleteUserExchanges,
  deleteUserMessages
};