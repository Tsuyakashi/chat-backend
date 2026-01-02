import { FastifyRequest, FastifyReply } from "fastify";
import { databaseService } from "../services/databaseService";

export async function apiKeyAuth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        reply.status(401).send({ message: 'Authorization header is required' });
        return;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        reply.status(401).send({ message: 'Invalid authorization format. Expected: Bearer <API_KEY>' });
        return;
    }

    const apiKey = parts[1];

    try {
        const isValid = await databaseService.validateApiKey(apiKey);
        if (!isValid) {
            reply.status(401).send({ message: 'Invalid API key' });
            return;
        }
    } catch (error) {
        reply.status(500).send({ message: 'Error validating API key' });
        return;
    }
}