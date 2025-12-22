// src/types/service.types.ts

import { IChatDocument, IDeleteResult } from './mongooseTypes';
import { ICreateChatData, IMessage } from './chatTypes';
import { IOpenAIMessage } from './openrouterTypes';

// Интерфейс для ChatService
export interface IChatService {
  getAllChats(): Promise<IChatDocument[]>;
  createChat(data: ICreateChatData): Promise<IChatDocument>;
  getChatHistory(id: string): Promise<IChatDocument | null>;
  deleteChat(id: string): Promise<IDeleteResult>;
  appendMessages(id: string, data: IMessage[]): Promise<IChatDocument | null>;
}

// Интерфейс для MessageService
export interface IMessageService {
  sendMessage(chatId: string, userId: string, message: string): Promise<IMessage>;
}

// Интерфейс для OpenRouterService
export interface IOpenRouterService {
  getResponse(messages: IOpenAIMessage[]): Promise<IMessage>;
}