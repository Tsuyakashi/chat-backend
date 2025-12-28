import { Chat, CreateChatDto, Message } from '../types/chatTypes'
import { getResponse } from './openRouterService';

export class ChatService {
    private chats: Chat[] = [
        {
            id: 1,
            chatOwner: 'someUser',
            messages: [
                { role: 'user', content: 'hello' },
                { role: 'assistant', content: 'hello back' }
            ]
        },
        {
            id: 2,
            chatOwner: 'anotherUser',
            messages: [
                { role: 'user', content: 'hello' },
                { role: 'assistant', content: 'hello back' }
            ]
        },

    ]

    private nextId = 3;

    async getAllChats(): Promise<Chat[]> {
        return this.chats
    }

    async getChatById(id: number, userId: string): Promise<Chat | undefined> {
        const chat = this.chats.find(chat => chat.id === id);

        if (!chat) {
            return undefined;
        }

        if (chat.chatOwner !== userId) {
            throw new Error('Unauthorized: You do not have access to this chat');
        } else {
            return chat;
        }
    }

    async createChat(dto: CreateChatDto): Promise<Chat> {
        if (!dto.chatOwner) {
            throw new Error('User is required');
        }
        const newChat: Chat = {
            id: this.nextId++,
            chatOwner: dto.chatOwner,
            messages: dto.systemPrompt
                ? [{ role: 'system', content: dto.systemPrompt }]
                : []
        }
        this.chats.push(newChat);
        return newChat;

    }

    async sendToChat(id: number, userId: string, message: Message): Promise<Message> {
        const chat = this.chats.find(chat => chat.id === id);

        if (!chat) {
            throw new Error('Chat not found')
        }

        if (chat.chatOwner !== userId) {
            throw new Error('Unauthorized: You do not have access to this chat');
        }

        if (!message) {
            throw new Error('Message is required');
        }

        chat.messages.push(message);

        const newMessage = await getResponse(chat.messages);

        chat.messages.push(newMessage);

        return newMessage;

    }

}
