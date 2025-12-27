export const config = {
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    chat: {
        model: 'openai/gpt-3.5-turbo',
        maxMessagesLimit: 25
    },
} as const

export type Config = typeof config;