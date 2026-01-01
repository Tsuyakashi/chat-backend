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


export class DatabaseService {
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
            console.log('PostgreSQL initialized successfully');
        } catch (err) {
            console.error('Postgres initialization error:', err);
        }
    }
}


