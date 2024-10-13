const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class Exchange extends Model {
  static associate(models) {
    Exchange.belongsTo(models.User, { as: 'requester', foreignKey: 'requesterId' });
    Exchange.belongsTo(models.User, { as: 'provider', foreignKey: 'providerId' });
    Exchange.belongsTo(models.Skill, { as: 'requesterSkill', foreignKey: 'requesterSkillId' });
    Exchange.belongsTo(models.Skill, { as: 'providerSkill', foreignKey: 'providerSkillId' });
  }
}

Exchange.init({
  requesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  requesterSkillId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Skills',
      key: 'id'
    }
  },
  providerSkillId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Skills',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined', 'canceled', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  meetingRequestStatus: {
    type: DataTypes.ENUM('none', 'requested', 'accepted'),
    allowNull: false,
    defaultValue: 'none'
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Exchange',
});

module.exports = Exchange;