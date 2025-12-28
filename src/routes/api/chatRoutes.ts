import { FastifyInstance } from 'fastify';
import { ChatController } from '../../controllers/chatController';
import { getAllChatsSchema, getChatByIdSchema, createChatSchema, sendToChatSchema } from '../../schemas/chatSchemas';

const chatController = new ChatController;

export async function chatRoutes(fastify: FastifyInstance) {
    fastify.get('/chats', { schema: getAllChatsSchema }, chatController.getAllChats);
    fastify.get('/chats/:id', { schema: getChatByIdSchema }, chatController.getChatById);

    fastify.post('/chats/', { schema: createChatSchema }, chatController.createChat);
    fastify.post('/chats/send/:id', { schema: sendToChatSchema }, chatController.sendToChat);

    fastify.delete('/chats/:id', { schema: getChatByIdSchema }, chatController.deleteChat);
}
