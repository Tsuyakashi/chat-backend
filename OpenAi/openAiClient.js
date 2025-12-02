const OpenAi = require('openai')
const OpenAiClient = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

module.exports = OpenAiClient;