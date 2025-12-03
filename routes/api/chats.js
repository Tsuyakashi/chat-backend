const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chatController')

router.get('/', chatController.getAllChats.bind(chatController));
router.post('/chats', chatController.createChat.bind(chatController));
router.post('/chat/:id/send', chatController.sendToChat.bind(chatController));
router.get('/:id', chatController.getChatHistory.bind(chatController));
router.delete('/:id', chatController.deleteChat.bind(chatController));

module.exports = router;