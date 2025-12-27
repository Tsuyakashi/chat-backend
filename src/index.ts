import Fastify from 'fastify';
import { config } from './config'
import { registerRoutes } from './routes';

const fastify = Fastify({
    logger: true,
});

const start = async () => {
    try {
        await fastify.register(registerRoutes);

        fastify.listen({
            port: config.server.port,
            host: config.server.host,
        });
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    };
};

start();

// const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/fastify";

// mongoose.connect(MONGO_URI).then(() => {
//     console.log('MongoDB connected');
//     app.listen(3000, () => {
//         console.log('Server is started on 3000 port');
//     });
// }).catch((err: Error) => {
//     console.error('Unable connecting to MongoDB', err);
//     process.exit(1);
// });