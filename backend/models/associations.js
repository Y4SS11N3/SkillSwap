const User = require('./User');
const Skill = require('./Skill');
const UserSkill = require('./UserSkill');

const setupAssociations = () => {
  // User associations
  User.belongsToMany(Skill, { through: UserSkill, foreignKey: 'userId' });

  // Skill associations
  Skill.belongsToMany(User, { through: UserSkill, foreignKey: 'skillId' });

  // UserSkill associations
  UserSkill.belongsTo(User, { foreignKey: 'userId' });
  UserSkill.belongsTo(Skill, { foreignKey: 'skillId' });
};

module.exports = {
  User,
  Skill,
  UserSkill,
  setupAssociations
};