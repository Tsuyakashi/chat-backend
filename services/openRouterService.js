const OpenAI = require('openai')
const model = process.env.CHAT_GPT_MODEL || 'gpt-3.5-turbo';
const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {},
});

class OpenRouterService {
    async getResponse(messages) {
        const completion = await client.chat.completions.create({
          model: model,
          messages: messages,  // Принимаем массив сообщений напрямую
        });
      
        return completion.choices[0].message;
    };
};

module.exports = new OpenRouterService