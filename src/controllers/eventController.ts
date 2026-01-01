import { FastifyRequest, FastifyReply } from 'fastify';
import { EventService } from '../services/eventService';
import { Event } from '../types/eventTypes';

const eventService = new EventService();

export class EventController {
    async health (_request: FastifyRequest, reply: FastifyReply) {
        try {
            reply.send('OK');
        } catch (err) {
            if (err instanceof Error) {
                reply.status(500).send({ message: err.message });
            } else {
                reply.status(500).send({ message: 'Unknown error' });
            }
        }
    }

    async eventSummary (request: FastifyRequest<{Body: Event[]}>, reply: FastifyReply) {
        try {
            const response = await eventService.summarize(request.body);
            reply.send(response);
        } catch (err) {
            if (err instanceof Error) {
                reply.status(500).send({ message: err.message });
                console.log(err);
            } else {
                reply.status(500).send({ message: 'Unknown error' });
            }
        }
    }
}