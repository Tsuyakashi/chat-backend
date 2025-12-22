import { MessageRole } from './chatTypes';

// Сообщение для отправки в OpenAI API
export interface IOpenAIMessage {
  role: MessageRole;
  content: string;
}

// Ответ от OpenAI API
export interface IOpenAIResponse {
  role: MessageRole;
  content: string;
}