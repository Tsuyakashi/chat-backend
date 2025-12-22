import { Document, Types } from 'mongoose';
import { IMessage, MessageRole } from './chatTypes';

// Интерфейс для поддокумента сообщения в схеме
export interface IMessageSchema {
  role: MessageRole;
  content: string;
  sentAt: Date;
}

// Интерфейс для схемы чата
export interface IChatSchema {
  userId: string;
  systemPrompt?: string;
  messages: IMessageSchema[];
  createdAt: Date;
}

// Интерфейс для документа Mongoose чата
export interface IChatDocument extends Document {
  _id: Types.ObjectId;
  userId: string;
  systemPrompt?: string;
  messages: Array<IMessage & { sentAt: Date }>;
  createdAt: Date;
}

// Тип для результата удаления
export interface IDeleteResult {
  deletedCount: number;
  acknowledged: boolean;
}