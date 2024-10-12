const { Skill, UserSkill } = require('../models/associations');

const skillController = {
  async createSkill(req, res, next) {
    try {
      const { name, description, category } = req.body;
      const skill = await Skill.create({ name, description, category });
      res.status(201).json(skill);
    } catch (error) {
      next(error);
    }
  },

  async getAllSkills(req, res, next) {
    try {
      const skills = await Skill.findAll();
      res.json(skills);
    } catch (error) {
        console.error('Detailed error:', error);
      next(error);
    }
  },

  async addKnownSkill(req, res, next) {
    try {
      const { skillId, proficiency } = req.body;
      const userId = req.user.id;
      const userSkill = await UserSkill.create({
        userId: userId,
        skillId: skillId,
        proficiency,
        isKnownSkill: true,
        isInterestedSkill: false
      });
      res.status(201).json(userSkill);
    } catch (error) {
      next(error);
    }
  },

  async addInterestedSkill(req, res, next) {
    try {
      const { skillId } = req.body;
      const userId = req.user.id;
      const userSkill = await UserSkill.create({
        userId: userId,
        skillId: skillId,
        isKnownSkill: false,
        isInterestedSkill: true
      });
      res.status(201).json(userSkill);
    } catch (error) {
      next(error);
    }
  },

  async getUserSkills(req, res, next) {
    try {
      const userId = req.user.id;
      const knownSkills = await UserSkill.findAll({
        where: { userId: userId, isKnownSkill: true },
        include: [{ model: Skill }]
      });
      const interestedSkills = await UserSkill.findAll({
        where: { userId: userId, isInterestedSkill: true },
        include: [{ model: Skill }]
      });
      res.json({ knownSkills, interestedSkills });
    } catch (error) {
        console.error('Detailed error in getUserSkills:', error);
      next(error);
    }
  }
};

module.exports = skillController;