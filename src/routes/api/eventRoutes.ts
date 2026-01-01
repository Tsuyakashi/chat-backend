import { FastifyInstance } from "fastify";
import { EventController } from "../../controllers/eventController";
import { eventSchema } from "../../schemas/eventSchemas";

const eventController = new EventController();

export async function eventRoutes (fastify: FastifyInstance) {
    fastify.get('/health', eventController.health);
    fastify.post('/event/rules', {schema: eventSchema}, eventController.eventSummary);
}