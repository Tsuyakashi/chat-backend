import { FastifyInstance } from 'fastify';
import { chatRoutes } from './api/chatRoutes';

export async function registerRoutes(fastify: FastifyInstance) {
    fastify.register(chatRoutes);
}
