const { Skill, UserSkill } = require('../models/associations');

/**
 * Controller for handling skill operations
 * @type {Object}
 */
const skillController = {
  /**
   * Create a new skill
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async createSkill(req, res, next) {
    try {
      const { name, description, category } = req.body;
      const skill = await Skill.create({ name, description, category });
      res.status(201).json(skill);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all skills
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async getAllSkills(req, res, next) {
    try {
      const skills = await Skill.findAll();
      res.json(skills);
    } catch (error) {
        console.error('Detailed error:', error);
      next(error);
    }
  },

  /**
   * Add a known skill for a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
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

  /**
   * Add an interested skill for a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
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

  /**
   * Delete a known skill for a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
  async deleteKnownSkill(req, res, next) {
    try {
      const { skillId } = req.params;
      const userId = req.user.id;
      
      const deletedCount = await UserSkill.destroy({
        where: {
          userId: userId,
          skillId: skillId,
          isKnownSkill: true
        }
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Known skill not found for this user" });
      }

      res.status(200).json({ message: "Known skill deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all skills for a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>}
   */
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