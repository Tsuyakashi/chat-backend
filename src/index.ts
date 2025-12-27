import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import { registerRoutes } from './routes';

const fastify = Fastify({
    logger: true,
});

const PORT = 3000;
const HOST = '0.0.0.0';


const start = async () => {
    try {
        await fastify.register(registerRoutes)

        fastify.listen({ port: PORT, host: HOST })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()

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