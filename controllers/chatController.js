const chatService = require('../services/chatService');
const openAiService = require('../services/openAiService');


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

    async sendToChat (req, res) {
        try {
            // massive of messages sent by user
            const { messages } = req.body;
            // getting older messages from history
            const chat = await chatService.getChatHistory(req.params.id);
            if (!chat) return res.status(404).json({ message: 'Chat not found' });
            // making messages massive for ai request
            const allMessages = [
                ...(chat.systemPrompt ? [{ role: "system", content: chat.systemPrompt }] : []),
                ...chat.messages.map(message => ({ role: message.role, content: message.content })),
                ...messages
            ];
            // getting response
            const aiMessage = await openAiService.getResponse({ messages: allMessages });
            // updating messages history
            await chatService.appendMessages(req.params.id, [
                ...messages,
                aiMessage.choices[0].message
            ]);
            // returning only answer to users
            res.json(aiMessage.choices[0].message);
        } catch (err) {
            res.status(500).json({ message: 'An error occurred', error: err})
        }
    }
}

module.exports = new ChatController