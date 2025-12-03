const chatService = require('../services/chatService');
const messageService = require('../services/messageService');

class ChatController {
    async getAllChats(req, res) {
        try {
            const chats = await chatService.getAllChats();
            res.json(chats);
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err });
        }
    }

    async createChat(req, res) {
        try {
            const chat = await chatService.createChat(req.body);
            res.status(201).json(chat._id);
        } catch (err) {
            res.status(400).json({ message: 'Bad request', error: err });
        }
    }

    async getChatHistory(req, res){
        try {
            const chat = await chatService.getChatHistory(req.params.id);
            if (!chat) return res.status(404).json({ message: 'Not found' });
            res.json(chat);
        } catch (err) {
            res.status(400).json({ message: 'Bad request', error: err });
        }
    }

    async deleteChat(req, res){
        try {
            const result = await chatService.deleteChat(req.params.id);
            if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found'});
            res.json({ message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err });
        }
    }

    async sendToChat(req, res) {
        try {
            const { userId, message } = req.body;
            const chatId = req.params.id;

            const assistantMessage = await messageService.sendMessage(chatId, userId, message);
            res.json(assistantMessage);
        } catch (err) {
            console.error('Error in sendToChat:', err);
            
            // Обработка разных типов ошибок
            if (err.message === 'Chat not found') {
                return res.status(404).json({ message: err.message });
            }
            if (err.message === 'Wrong user id') {
                return res.status(403).json({ message: err.message });
            }
            
            const errorResponse = {
                message: err.message || 'Unknown error',
                ...(err.status && { status: err.status }),
                ...(err.code && { code: err.code }),
                ...(err.type && { type: err.type }),
                ...(err.error && { details: err.error })
            };
            res.status(500).json({ message: 'An error occurred', error: errorResponse });
        }
    }
}

module.exports = new ChatController