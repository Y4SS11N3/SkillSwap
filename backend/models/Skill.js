const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class Skill extends Model {
  static associate(models) {
  }
}

Skill.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('Programming', 'Design', 'Business', 'Marketing', 'Other'),
    allowNull: false
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Skill',
});

module.exports = Skill;