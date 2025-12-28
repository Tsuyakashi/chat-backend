import { ChatService } from '../services/chatService';
import { FastifyRequest, FastifyReply } from 'fastify';
import { GetChatByIdParams, CreateChatDto } from '../types/chatTypes';

const chatService = new ChatService;


function handleError(reply: FastifyReply, err: unknown) {
    if (err instanceof Error) {
        reply.status(500).send({ message: err.message });
    } else {
        reply.status(500).send({ message: 'Unknown error' });
    }
}


export class ChatController {
    async getAllChats(_request: FastifyRequest, reply: FastifyReply) {
        try {
            const chats = await chatService.getAllChats();
            reply.send(chats);
        } catch (err) {
            handleError(reply, err);
        }
    }

    async getChatById(request: FastifyRequest<{
        Params: GetChatByIdParams;
        Querystring: { userId?: string };
    }>, reply: FastifyReply) {
        try {
            const id = request.params.id;
            const userId = request.query.userId;

            if (!userId) {
                reply.status(400).send({ message: 'UserId query parameter is required' });
                return;
            }

            const chat = await chatService.getChatById(id, userId);

            if (!chat) {
                reply.status(404).send({ message: 'Chat not found' });
                return;
            }

            reply.send(chat);
        } catch (err) {
            if (err instanceof Error && err.message.includes('Unauthorized')) {
                reply.status(403).send({ message: err.message });
                return;
            }
            handleError(reply, err);
        }
    }

    async createChat(request: FastifyRequest<{ Body: CreateChatDto }>, reply: FastifyReply) {
        try {
            const chat = await chatService.createChat(request.body);
            reply.status(201).send(chat);
        } catch (err) {
            handleError(reply, err);
        }
    }

    async sendToChat(request: FastifyRequest<{
        Params: GetChatByIdParams;
        Body: { userId: string, message: string };
    }>, reply: FastifyReply) {
        try {
            const assistantMessage = await chatService.sendToChat(
                request.params.id,
                request.body.userId,
                request.body.message,
            );
            reply.status(200).send(assistantMessage);
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes('Unauthorized')) {
                    reply.status(403).send({ message: err.message });
                    return;
                }
                if (err.message.includes('Chat not found')) {
                    reply.status(404).send({ message: err.message });
                    return;
                }
                if (err.message.includes('Invalid message') || err.message.includes('Message is required')) {
                    reply.status(400).send({ message: err.message });
                    return;
                }
            }
            handleError(reply, err);
        }
    }

    async deleteChat(request: FastifyRequest<{ Params: GetChatByIdParams }>, reply: FastifyReply) {
        try {
            const id = request.params.id;

            const result = await chatService.deleteChat(id);
            reply.status(200).send(result);
        } catch (err) {
            if (err instanceof Error && err.message.includes('Chat not found')) {
                reply.status(404).send({ message: err.message });
                return;
            }
            handleError(reply, err);
        }
    }
}
