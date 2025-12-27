// import chatService from './chatService';
// import openRouterService from './openRouterService';
// import { IMessageService } from '../types/serviceTypes';
// import { IMessage, MessageRole } from '../types/chatTypes';
// import { IOpenAIMessage } from '../types/openrouterTypes';

// const maxMessages = parseInt(process.env.MAX_MESSAGES_LIMIT || '25', 10);

// class MessageService implements IMessageService {
//     async sendMessage(chatId: string, userId: string, message: string): Promise<IMessage> {    
//         // getting older messages from history
//         const chat = await chatService.getChatHistory(chatId);
//         if (!chat) throw new Error('Chat not found');
//         if (chat.userId !== userId) throw new Error('Wrong user id');
        
//         // making messages massive for ai request
//         const validRoles: MessageRole[] = ['system', 'user', 'assistant'];
//         const messagesToSend: IOpenAIMessage[] = [
//             ...(chat.systemPrompt ? [{ role: "system" as const, content: chat.systemPrompt }] : []),
//             ...chat.messages
//                 .filter(msg => validRoles.includes(msg.role))
//                 .map(msg => ({ 
//                     role: msg.role, 
//                     content: msg.content 
//                 }))
//                 .slice(-(maxMessages - 1)),
//             { role: "user" as const, content: message }
//         ];
        
//         // getting response
//         const assistantMessage = await openRouterService.getResponse(messagesToSend);
        
//         // updating messages history
//         await chatService.appendMessages(chatId, [
//             { role: "user" as MessageRole, content: message },
//             assistantMessage
//         ]);
        
//         // returning only answer to users
//         return assistantMessage;                
//     }
// }

// export default new MessageService();