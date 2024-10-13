const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', messageController.createMessage);
router.get('/:exchangeId', messageController.getMessages);

module.exports = router;