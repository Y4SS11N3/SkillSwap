const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', exchangeController.createExchange);
router.get('/', exchangeController.getExchanges);
router.put('/:id', exchangeController.updateExchangeStatus);
router.delete('/:id', exchangeController.cancelExchange);
router.get('/search', exchangeController.searchSkills);
router.get('/:id', exchangeController.getExchangeDetails);

module.exports = router;