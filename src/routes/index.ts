import { FastifyInstance } from 'fastify';
import { chatRoutes } from './api/chatRoutes';
import { eventRoutes } from './api/eventRoutes'

export async function registerRoutes(fastify: FastifyInstance) {
    fastify.register(chatRoutes);
    fastify.register(eventRoutes);
}
