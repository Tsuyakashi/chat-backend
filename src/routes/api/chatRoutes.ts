import express, { Router } from 'express';
import chatController from '../../controllers/chatController';

const router: Router = express.Router();

router.get('/', chatController.getAllChats.bind(chatController));
router.post('/chats', chatController.createChat.bind(chatController));
router.post('/chat/:id/send', chatController.sendToChat.bind(chatController));
router.get('/chats/:id', chatController.getChatHistory.bind(chatController));
router.delete('/chats/:id', chatController.deleteChat.bind(chatController));

export default router;
