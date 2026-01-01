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
        mongoUri: 'mongodb://localhost:27017/chat-backend',
        postgresHost: 'localhost',
        postgresPort: 5432,
        postgresDBName: 'events',
    },
    events: {
        prompt: `Generate a concise summary in markdown format of the event description provided. The summary should highlight the key completion criteria, deadline, and important rules. Keep it brief and focused on the essential information. Format as clean markdown text.`
    }
} as const;

export type Config = typeof config;