const client = require('../OpenAi/openAiClient');
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
