import OpenAI from 'openai';
import { IOpenRouterService } from '../types/serviceTypes';
import { IMessage } from '../types/chatTypes';
import { IOpenAIMessage } from '../types/openrouterTypes';

if (!process.env.CHAT_MODEL) {
    throw new Error('CHAT_MODEL environment variable is required');
}

if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY environment variable is required');
}

const model: string = process.env.CHAT_MODEL;
const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {},
});

class OpenRouterService implements IOpenRouterService {
    async getResponse(messages: IOpenAIMessage[]): Promise<IMessage> {
        const completion = await client.chat.completions.create({
          model: model,
          messages: messages,
        });
      
        const message = completion.choices[0]?.message;
        if (!message) {
            throw new Error('No message in completion response');
        }
        
        if (!message.content) {
            throw new Error('Message content is empty');
        }
        
        // Проверяем, что роль соответствует ожидаемому типу
        const validRoles: IMessage['role'][] = ['system', 'user', 'assistant'];
        const role = validRoles.includes(message.role as IMessage['role']) 
            ? message.role as IMessage['role']
            : 'assistant';
        
        return {
            role,
            content: message.content,
        };
    }
}

export default new OpenRouterService();