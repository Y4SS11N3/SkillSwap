const User = require('./User');
const Skill = require('./Skill');
const UserSkill = require('./UserSkill');
const Exchange = require('./Exchange');

const setupAssociations = () => {
  // User associations
  User.belongsToMany(Skill, { through: UserSkill, foreignKey: 'userId' });

  // Skill associations
  Skill.belongsToMany(User, { through: UserSkill, foreignKey: 'skillId' });

  // UserSkill associations
  UserSkill.associate({ User, Skill });

  // Exchange associations
  Exchange.belongsTo(User, { as: 'requester', foreignKey: 'requesterId' });
  Exchange.belongsTo(User, { as: 'provider', foreignKey: 'providerId' });
  Exchange.belongsTo(Skill, { as: 'requesterSkill', foreignKey: 'requesterSkillId' });
  Exchange.belongsTo(Skill, { as: 'providerSkill', foreignKey: 'providerSkillId' });
};

module.exports = {
  User,
  Skill,
  UserSkill,
  Exchange,
  setupAssociations
};