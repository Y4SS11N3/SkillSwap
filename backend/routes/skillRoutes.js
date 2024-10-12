const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin routes
router.post('/create', authMiddleware, skillController.createSkill);
router.get('/all', skillController.getAllSkills);

// User skill routes
router.post('/user/known/add', authMiddleware, skillController.addKnownSkill);
router.post('/user/interested/add', authMiddleware, skillController.addInterestedSkill);
router.get('/user', authMiddleware, skillController.getUserSkills);

module.exports = router;