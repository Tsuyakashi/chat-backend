const chatService = require('../services/chatService');
const openAiService = require('../services/openAiService');
const maxMessages = parseInt(process.env.MAX_MESSAGES_LIMIT) || 25;

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

    async sendToChat (req, res) {
        try {
            // message sent by user
            const userMessage = req.body.message;
            // getting older messages from history
            const chat = await chatService.getChatHistory(req.params.id);
            if (!chat) return res.status(404).json({ message: 'Chat not found' });
            if (chat.userId !== req.body.userId) return res.status(403).json({ message: 'Wrong user id' });
            // making messages massive for ai request
            const messagesToSend = [
                ...(chat.systemPrompt ? [{ role: "system", content: chat.systemPrompt }] : []),
                ...chat.messages.map(message => ({ role: message.role, content: message.content })).slice(-(maxMessages-1)),
                ...[{ role: "user", content: userMessage}]
            ];

            // getting response
            const aiMessage = await openAiService.getResponse({ messages: messagesToSend });
            // updating messages history
            await chatService.appendMessages(req.params.id, [
                { role: "user", content: userMessage },
                aiMessage.choices[0].message
            ]);
            // returning only answer to users
            res.json(aiMessage.choices[0].message);
        } catch (err) {
            console.error('Error in sendToChat:', err); // Логирование в консоль
            // Правильная сериализация ошибки
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