const client = require('../OpenAi/openAiClient');

class OpenAiService {

    async getResponse(data) {
        return await client.chat.completions.create({
            model: 'gpt-5-mini',
            ...data
        });
    }
}

module.exports = new OpenAiService();
