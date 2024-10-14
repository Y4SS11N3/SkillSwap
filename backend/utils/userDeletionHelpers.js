const { UserSkill, Exchange, Message } = require('../models/associations');

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
  await Message.destroy({ 
    where: { 
      [Sequelize.Op.or]: [
        { senderId: userId },
        { receiverId: userId }
      ]
    } 
  });
}

module.exports = {
  deleteUserSkills,
  deleteUserExchanges,
  deleteUserMessages
};