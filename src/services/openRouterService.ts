import OpenAI from 'openai'
import { config } from '../config';
import { secrets } from '../config/secret'
import { Message } from '../types/chatTypes';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: secrets.openRouter.apiKey,
    defaultHeaders: {},
});

export async function getResponse(promptChain: Message[]): Promise<Message> {
    const completion = await openai.chat.completions.create({
        model: config.chat.model,
        messages: promptChain,
    });

    const message = completion.choices[0]?.message

    if (!message) {
        throw new Error('No message in completion response');
    }

    if (!message.content) {
        throw new Error('Message content is empty')
    }

    return {
        role: 'assistant',
        content: message.content,
        sentAt: new Date(),
    };
}
