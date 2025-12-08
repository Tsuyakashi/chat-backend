const OpenAi = require('openai')
const client = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.CHAT_GPT_MODEL || 'gpt-4o';

class OpenAiService {

    async getResponse(data) {
        return await client.chat.completions.create({
            model: model,
            ...data
        });
    }
}

module.exports = new OpenAiService();
