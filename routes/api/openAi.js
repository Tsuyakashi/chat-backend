const express = require('express');
const router = express.Router();
const openAiController = require('../../controllers/openAiController');

router.post('/', openAiController.getResponse.bind(openAiController));

module.exports = router;