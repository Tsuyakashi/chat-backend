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
    // mongo: {
    //     host: requiredEnv('MONGO_URI')
    // },
    // postgres: {
    //     host: requiredEnv('POSTGRES_HOST'), // config.database.postgresHost,
    //     port: requiredEnv('POSTGRES_PORT'), //secrets.database.postgresPort,
    //     database: requiredEnv('POSTGRES_DB_NAME'), // 'testdb',
    postgres: {    
        user: requiredEnv('POSTGRES_USER'),
        password: requiredEnv('POSTGRES_PASSWORD'),
    },
} as const

export type Secrets = typeof secrets;