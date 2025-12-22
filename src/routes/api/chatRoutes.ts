import express, { Router } from 'express';
import chatController from '../../controllers/chatController';

const chatRoutes: Router = express.Router();

chatRoutes.get('/', chatController.getAllChats.bind(chatController));
chatRoutes.get('/:id', chatController.getChatHistory.bind(chatController));

chatRoutes.post('/', chatController.createChat.bind(chatController));
chatRoutes.post('/:id/send', chatController.sendToChat.bind(chatController));

chatRoutes.delete('/:id', chatController.deleteChat.bind(chatController));

export { chatRoutes };
