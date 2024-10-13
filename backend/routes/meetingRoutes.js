const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/:exchangeId/request', meetingController.requestMeeting);
router.post('/:exchangeId/accept', meetingController.acceptMeeting);
router.get('/:exchangeId', meetingController.getMeetingDetails);

module.exports = router;