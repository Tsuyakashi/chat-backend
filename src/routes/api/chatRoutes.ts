import { FastifyInstance } from 'fastify';
import { ChatController } from '../../controllers/chatController';

const chatController = new ChatController

export async function chatRoutes(fastify: FastifyInstance) {
    fastify.get('/chats', chatController.getAllChats);
    fastify.get('/chats/:id', chatController.getChatById);

    fastify.post('/chats/', chatController.createChat);
    fastify.post('/chats/send/:id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
            },
            body: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                    message: {
                        type: 'object',
                        properties: {
                            role: { type: 'string', enum: ['system', 'assistant', 'user'] },
                            content: { type: 'string' }
                        },
                        required: ['role', 'content']
                    }
                },
                required: ['userId', 'message']
            }
        }
    }, chatController.sendToChat);

    // fastify.delete('/:id', chatController.deleteChat');
}
