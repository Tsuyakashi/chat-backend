import { Chat, CreateChatDto, Message } from '../types/chatTypes';
import { getResponse } from './openRouterService';
import { config } from '../config';
import { ChatModel } from '../models/chats';

export class ChatService {
    async getAllChats(userId: string): Promise<Chat[]> {
        const chats = await ChatModel.find().exec();

        if (userId === 'admin') {
            return chats.map(chat => this.toChat(chat));
        }
        
        const userChats = chats.filter(chat => chat.userId === userId);
        return userChats.map(chat => this.toChat(chat));
    }

    async getChatById(id: string, userId: string): Promise<Chat | undefined> {
        const chat = await ChatModel.findById(id).exec();

        if (!chat || chat.userId !== userId) {
            return undefined;
        }

        // if (chat.userId !== userId) {
        //     throw new Error('Unauthorized: You do not have access to this chat');
        // }

        return this.toChat(chat);
    }

    async createChat(dto: CreateChatDto): Promise<Chat> {
        if (!dto.userId) {
            throw new Error('User is required');
        }

        if (dto.systemPrompt && dto.systemPrompt.length > config.chat.maxMessagesLength) {
            throw new Error(`System prompt exceeds maximum length of ${config.chat.maxMessagesLength} characters`);
        }

        const newChat = new ChatModel({
            userId: dto.userId,
            messages: dto.systemPrompt
                ? [{ role: 'system', content: dto.systemPrompt }]
                : []
        });

        const savedChat = await newChat.save();
        return this.toChat(savedChat);
    }

    private extractSystemPrompt(messages: Message[]): string | undefined {
        const systemMessage = messages.find(msg => msg.role === 'system');
        return systemMessage?.content
    }

    private limitMessages(messages: Message[]): Message[] {
        if (messages.length <= config.chat.maxMessagesLimit) {
            return messages;
        }

        const systemMessage = messages.find(msg => msg.role === 'system');
        const nonSystemMessages = messages.filter(msg => msg.role !== 'system');

        if (nonSystemMessages.length === 0) {
            throw new Error('Chat must contain at least one non-system message');
        }

        return systemMessage
            ? [systemMessage, ...nonSystemMessages.slice(-(config.chat.maxMessagesLimit - 1))]
            : nonSystemMessages.slice(-config.chat.maxMessagesLimit);
    }

    private activeRequests = new Map<string, Promise<Message>>();

    async sendToChat(id: string, userId: string, userMessage: string): Promise<Message> {
        const existingRequest = this.activeRequests.get(id);

        if (existingRequest) {
            await existingRequest;
        }

        const requestPromise = this.executeSendToChat(id, userId, userMessage);

        this.activeRequests.set(id, requestPromise);

        try {
            const result = await requestPromise;
            return result;
        } finally {
            this.activeRequests.delete(id);
        }
    }

    private async executeSendToChat(id: string, userId: string, userMessage: string): Promise<Message> {
        const chat = await ChatModel.findById(id).exec();

        if (!chat || chat.userId !== userId) {
            throw new Error('Chat not found');
        }

        // if (chat.userId !== userId) {
        //     throw new Error('Unauthorized: You do not have access to this chat');
        // }

        if (!userMessage) {
            throw new Error('Message is required');
        }

        if (userMessage.length > config.chat.maxMessagesLength) { 
            throw new Error(`Message exceeds maximum length of ${config.chat.maxMessagesLength} characters`);
        }

        chat.messages.push({
            role: 'user',
            content: userMessage,
            sentAt: new Date(),
        });
        const limitedMesasages = this.limitMessages(chat.messages);
        const assistantMessage = await getResponse(limitedMesasages);
        chat.messages.push(assistantMessage);

        await chat.save();

        return assistantMessage;
    }

    async deleteChat(id: string, userId: string) {
        const chat = await ChatModel.findById(id).exec();

        if (!chat || chat.userId !== userId) {
            throw new Error('Chat not found'); // not found or unauthorized
        }

        await ChatModel.findByIdAndDelete(id).exec();

        return { message: 'Chat deleted successfully' };
    }

    private toChat(chat: any): Chat {
        return {
            id: chat._id.toString(),
            userId: chat.userId,
            messages: chat.messages,
            systemPrompt: this.extractSystemPrompt(chat.messages)
        };
    }
}
