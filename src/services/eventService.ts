import { getResponse } from './openRouterService';
import { Message } from '../types/chatTypes';
import { Event } from '../types/eventTypes';
import { config } from '../config';

export class EventService {
    private async eventSummary(description: string): Promise<string> {
        if (!description) {
            throw new Error('Description cannot be empty');
        }

        const promptChain: Message[] = [
            { 
                role: 'system', 
                content: config.events.prompt, 
                sentAt: new Date(), 
            },
            { 
                role: 'user', 
                content: `Event description: ${description}`, 
                sentAt: new Date(),
            },
        ];

        const response = await getResponse(promptChain);

        return response.content;
    }

    async summarize(events: Event[]): Promise<string[]>{
        if (!events || events.length === 0) {
            throw new Error('At least one event is needed');
        }
        const eventsSummary = await Promise.all(
            events.map(event => this.eventSummary(event.description))
        );

        return eventsSummary;
    }
}

