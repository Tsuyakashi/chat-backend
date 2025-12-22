// Роли сообщений в чате
export type MessageRole = 'system' | 'user' | 'assistant';

// Структура одного сообщения
export interface IMessage {
  role: MessageRole;
  content: string;
  sentAt?: Date;
}

// Структура чата (без MongoDB полей)
export interface IChat {
  userId: string;
  systemPrompt?: string;
  messages: IMessage[];
  createdAt?: Date;
}

// Данные для создания нового чата
export interface ICreateChatData {
  userId: string;
  systemPrompt?: string;
  messages?: IMessage[];
}

// Данные для отправки сообщения
export interface ISendMessageData {
  userId: string;
  message: string;
}