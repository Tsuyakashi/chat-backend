import { FastifyInstance } from 'fastify';
import { ChatController } from '../../controllers/chatController';

const chatController = new ChatController

export async function chatRoutes(fastify: FastifyInstance) {
    fastify.get('/chats', chatController.getAllChats);
    // fastify.get('/:id', chatController.getChatHistory);

    // fastify.post('/', chatController.createChat);
    // fastify.post('/:id/send', chatController.sendToChat);

    // fastify.delete('/:id', chatController.deleteChat');
}
