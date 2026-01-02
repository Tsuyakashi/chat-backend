import { FastifyInstance } from "fastify";
import { EventController } from "../../controllers/eventController";
import { eventSchema } from "../../schemas/eventSchemas";
import { apiKeyAuth } from "../../middleware/apiAuthKey";

const eventController = new EventController();

export async function eventRoutes(fastify: FastifyInstance) {
    fastify.get('/health', eventController.health);

    fastify.get('/api-keys', eventController.createApiKey);

    fastify.post('/event/rules', {
        schema: eventSchema,
        preHandler: [apiKeyAuth]
    }, async (request, reply) => {
        return eventController.eventSummary(request, reply);
    });
}