import mongoose from "mongoose";
import { config } from "../config";

export class DatabaseService {
    private MONGO_URI = config.database.uri;
    private isConnected = false;

    async connect(): Promise<void> {
        if (this.isConnected || mongoose.connection.readyState === 1) {
            console.log('MongoDB already connected');
            return;
        }

        try {
            await mongoose.connect(this.MONGO_URI);
            this.isConnected = true
            console.log('MongoDB connected successfully');

            mongoose.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error);
                this.isConnected = false;
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
                this.isConnected = false;
            });

            mongoose.connection.on('reconnected', () => {
                console.log('MongoDB reconnected');
                this.isConnected = true;
            });
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            if (mongoose.connection.readyState !== 0) {
                await mongoose.disconnect();
                this.isConnected = false;
                console.log('MongoDB disconnected successfully');
            }
        } catch (error) {
            console.error('MongoDB disconnection error:', error);
        }
    }

    getConnectionStatus(): boolean {
        return this.isConnected || mongoose.connection.readyState === 1;
    }
}


