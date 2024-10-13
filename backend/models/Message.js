const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class Message extends Model {
  static associate(models) {
    Message.belongsTo(models.Exchange, { foreignKey: 'exchangeId' });
    Message.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
  }
}

Message.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  exchangeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Exchanges',
      key: 'id'
    }
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Message',
});

module.exports = Message;