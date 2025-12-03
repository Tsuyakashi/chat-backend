const chatService = require('./chatService');
const openAiService = require('./openAiService');
const maxMessages = parseInt(process.env.MAX_MESSAGES_LIMIT) || 25;

class MessageService {
    async sendMessage (chatId, userId, message) {    
        // getting older messages from history
        const chat = await chatService.getChatHistory(chatId);
        if (!chat) throw new Error('Chat not found');
        if (chat.userId !== userId) throw new Error('Wrong user id');
        // making messages massive for ai request
        const messagesToSend = [
            ...(chat.systemPrompt ? [{ role: "system", content: chat.systemPrompt }] : []),
            ...chat.messages.map(messages => ({ role: messages.role, content: messages.content })).slice(-(maxMessages-1)),
            ...[{ role: "user", content: message}]
        ];
        // getting response
        const assistantMessage = await openAiService.getResponse({ messages: messagesToSend });
        // updating messages history
        await chatService.appendMessages(chatId, [
            { role: "user", content: message },
            assistantMessage.choices[0].message
        ]);
        // returning only answer to users
        return assistantMessage.choices[0].message;                
    }
}

module.exports = new MessageService;