import 'dotenv/config';
import Fastify from 'fastify';
import mongoose from 'mongoose';
import { config } from './config'
import { registerRoutes } from './routes';

const fastify = Fastify({
    logger: true,
});

async function connectDatabase(): Promise<void> {
    const MONGO_URI = config.database.uri;

    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

const start = async () => {
    try {
        await connectDatabase();

        await fastify.register(registerRoutes);

        fastify.listen({
            port: config.server.port,
            host: config.server.host,
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    };
};

start();
