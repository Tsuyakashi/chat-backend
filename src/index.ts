import 'dotenv/config';
import Fastify from 'fastify';
import { databaseService } from './services/databaseService';
import { config } from './config'
import { registerRoutes } from './routes';

const fastify = Fastify({
    logger: true,
});

const start = async () => {
    try {
        databaseService.initPostgres().catch((err) => {
            fastify.log.warn('PostgreSQL initialization failed:', err);
        });
        databaseService.connectMongo().catch((err) => {
            fastify.log.warn('MongoDB connection failed:', err);
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
