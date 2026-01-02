import mongoose from "mongoose";
import { Pool } from 'pg';
import { config } from "../config";
import { secrets } from "../config/secret";

const pool: Pool = new Pool({
    host: config.database.postgresHost,
    port: config.database.postgresPort,
    database: config.database.postgresDBName,
    user: secrets.postgres.user,
    password: secrets.postgres.password,
})


class DatabaseService {
    private MONGO_URI = config.database.mongoUri;
    private isConnectedMongo = false;

    async connectMongo(): Promise<void> {
        if (this.isConnectedMongo || mongoose.connection.readyState === 1) {
            console.log('MongoDB already connected');
            return;
        }
        if (!this.MONGO_URI) {
            console.warn('MONGO_URI is not set');
            return;
        }


        try {
            await mongoose.connect(this.MONGO_URI);
            this.isConnectedMongo = true
            console.log('MongoDB connected successfully');

            mongoose.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error);
                this.isConnectedMongo = false;
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
                this.isConnectedMongo = false;
            });

            mongoose.connection.on('reconnected', () => {
                console.log('MongoDB reconnected');
                this.isConnectedMongo = true;
            });
        } catch (error) {
            console.error('MongoDB connection error:', error);
        }
    }

    async disconnectMongo(): Promise<void> {
        try {
            if (mongoose.connection.readyState !== 0) {
                await mongoose.disconnect();
                this.isConnectedMongo = false;
                console.log('MongoDB disconnected successfully');
            }
        } catch (error) {
            console.error('MongoDB disconnection error:', error);
        }
    }

    getMongoConnectionStatus(): boolean {
        return this.isConnectedMongo || mongoose.connection.readyState === 1;
    }

    async query(text: string, params?: any[]) {
        try {
            return pool.query(text, params);
        } catch (err) {
            console.error('PostgreSQL error:', err);
            throw err;
        }
    }

    async initPostgres(): Promise<void> {
        try {
            await this.query(
                `CREATE TABLE IF NOT EXISTS events (
                id VARCHAR PRIMARY KEY,
                summary TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
                );`
            );

            await this.query(
                `CREATE TABLE IF NOT EXISTS api_keys (
                api_key UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                created_at TIMESTAMP DEFAULT NOW()
                );`
            );

            console.log('PostgreSQL initialized successfully');
        } catch (err) {
            console.error('Postgres initialization error:', err);
        }
    }

    async validateApiKey(apiKey: string): Promise<boolean> {
        try {
            const result = await this.query(
                `SELECT 1 FROM api_keys WHERE api_key = $1`,
                [apiKey]
            );
            return result.rows.length > 0;
        } catch (err) {
            console.error('API key validation error:', err);
            return false;
        }
    }

    async createApiKey(): Promise<string> {
        try {
            const result = await this.query(
                `INSERT INTO api_keys (api_key) VALUES (gen_random_uuid()) RETURNING api_key`,
                []
            );
            return result.rows[0].api_key;
        } catch (err) {
            console.error('API key creation error:', err);
            throw err;
        }
    }
}

export const databaseService = new DatabaseService();
