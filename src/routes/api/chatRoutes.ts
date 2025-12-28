import { FastifyInstance } from 'fastify';
import { ChatController } from '../../controllers/chatController';
import { sendToChatSchema } from '../../schemas/chatSchemas';

const chatController = new ChatController;

export async function chatRoutes(fastify: FastifyInstance) {
    fastify.get('/chats', chatController.getAllChats);
    fastify.get('/chats/:id', chatController.getChatById);

    fastify.post('/chats/', chatController.createChat);
    fastify.post('/chats/send/:id', { schema: sendToChatSchema }, chatController.sendToChat);

    fastify.delete('/chats/:id', chatController.deleteChat);
}
