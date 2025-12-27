import { ChatService } from '../services/chatService';
import { FastifyRequest, FastifyReply } from 'fastify';

const chatService = new ChatService

export class ChatController {
    async getAllChats(_request: FastifyRequest, reply: FastifyReply) {
        try {
            const chats = await chatService.getAllChats();
            reply.send(chats)
        } catch (err) {
            reply.status(500).send(
                "err",
                // err
            )
        }
    }
}

// class ChatController {
//     async getAllChats(_req: any, res: Response): Promise<void> {
//         try {
//             const chats = await chatService.getAllChats();
//             res.json(chats);
//         } catch (err: any) {
//             res.status(500).json({ message: 'Server error', error: err });
//         }
//     }

//     async createChat(req: CreateChatRequest, res: Response): Promise<void> {
//         try {
//             const chat = await chatService.createChat(req.body);
//             res.status(201).json({ id: chat._id.toString() });
//         } catch (err: any) {
//             res.status(400).json({ message: 'Bad request', error: err });
//         }
//     }

//     async getChatHistory(req: GetChatRequest, res: Response): Promise<void> {
//         try {
//             const chat = await chatService.getChatHistory(req.params.id);
//             if (!chat) {
//                 res.status(404).json({ message: 'Not found' });
//                 return;
//             }
//             res.json(chat);
//         } catch (err: any) {
//             res.status(400).json({ message: 'Bad request', error: err });
//         }
//     }

//     async deleteChat(req: DeleteChatRequest, res: Response): Promise<void> {
//         try {
//             const result = await chatService.deleteChat(req.params.id);
//             if (result.deletedCount === 0) {
//                 res.status(404).json({ message: 'Not found' });
//                 return;
//             }
//             res.json({ message: 'Deleted successfully' });
//         } catch (err: any) {
//             res.status(500).json({ message: 'Server error', error: err });
//         }
//     }

//     async sendToChat(req: SendMessageRequest, res: Response): Promise<void> {
//         try {
//             const { userId, message } = req.body;
//             const chatId = req.params.id;

//             const assistantMessage = await messageService.sendMessage(chatId, userId, message);
//             res.json(assistantMessage);
//         } catch (err: any) {
//             console.error('Error in sendToChat:', err);

//             // Обработка разных типов ошибок
//             if (err.message === 'Chat not found') {
//                 res.status(404).json({ message: err.message });
//                 return;
//             }
//             if (err.message === 'Wrong user id') {
//                 res.status(403).json({ message: err.message });
//                 return;
//             }

//             const errorResponse = {
//                 message: err.message || 'Unknown error',
//                 ...(err.status && { status: err.status }),
//                 ...(err.code && { code: err.code }),
//                 ...(err.type && { type: err.type }),
//                 ...(err.error && { details: err.error })
//             };
//             res.status(500).json({ message: 'An error occurred', error: errorResponse });
//         }
//     }
// }

// export default new ChatController();