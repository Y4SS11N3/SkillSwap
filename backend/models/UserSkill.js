const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class UserSkill extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.Skill, { foreignKey: 'skillId' });
  }
}

UserSkill.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id'
    },
    field: 'userId'
  },
  skillId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Skills',
      key: 'id'
    },
    field: 'skillId'
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
  tableName: 'UserSkills',
  underscored: false,
});

module.exports = UserSkill;