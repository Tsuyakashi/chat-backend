function requiredEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Required enviroment variable ${key} is not set`);
    }
    return value;
}

export const secrets = {
    openRouter: {
        apiKey: requiredEnv('OPENROUTER_API_KEY'),
    },
} as const

export type Secrets = typeof secrets;