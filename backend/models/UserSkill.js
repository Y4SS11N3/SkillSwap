const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class UserSkill extends Model {
  static associate(models) {
  }
}

UserSkill.init({
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  SkillId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Skills',
      key: 'id'
    }
  },
  proficiency: {
    type: DataTypes.ENUM('competent', 'proficient', 'expert', 'master'),
    allowNull: true
  },
  isKnownSkill: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isInterestedSkill: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'UserSkill',
});

module.exports = UserSkill;