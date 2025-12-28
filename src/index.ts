import 'dotenv/config';
import Fastify from 'fastify';
import { DatabaseService } from './services/databaseService';
import { config } from './config'
import { registerRoutes } from './routes';

const fastify = Fastify({
    logger: true,
});

const databaseService = new DatabaseService

const start = async () => {
    try {
        databaseService.connect().catch((err) => {
            fastify.log.error('Database connection failed:', err);
        });

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
