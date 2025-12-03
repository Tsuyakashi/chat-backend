const client = require('../OpenAi/openAiClient');

class OpenAiService {

    async getResponse(data) {
        return await client.chat.completions.create({
            model: 'gpt-4o',
            ...data
        });
    }
}

module.exports = new OpenAiService();
