export const config = {
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    chat: {
        model: 'openai/gpt-3.5-turbo',
        maxMessagesLimit: 25,
        maxMessagesLength: 5000,
    },
    database: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/chat-backend',
    },
} as const;

export type Config = typeof config;