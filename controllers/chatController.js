const chatService = require('../services/chatService');

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
            res.status(201).json(chat);
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
}

module.exports = new ChatController