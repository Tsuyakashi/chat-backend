import { getResponse } from './openRouterService';
import { Message } from '../types/chatTypes';
import { Event } from '../types/eventTypes';
import { config } from '../config';
import { DatabaseService } from './databaseService';

const databaseService = new DatabaseService();

export class EventService {
    private async eventSummary(event: Event): Promise<string> {

        const description = event.description;

        if (!description) {
            throw new Error('Description cannot be empty');
        }

        try {
            const dbEvent = await databaseService.query(
                'SELECT id, summary, created_at, updated_at FROM events WHERE id = $1',
                [event.id]
            );
            if (dbEvent.rows.length > 0 && dbEvent.rows[0].summary) {
                return dbEvent.rows[0].summary;
            }
        } catch (err: any) {
            console.warn('⚠️  Database query error:', err.message);
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

        const summary = (await getResponse(promptChain)).content;

        try {
            await databaseService.query(
                `INSERT INTO events (id, summary, created_at, updated_at)
                VALUES ($1, $2, NOW(), NOW())
                ON CONFLICT (id) 
                DO UPDATE SET summary = $2, updated_at = NOW()`,
                [event.id, summary]
            );
        } catch (err: any) {
            console.warn('⚠️  Failed to save summary to database:', err.message)
        }

        return summary;
    }

    async summarize(events: Event[]): Promise<string[]> {
        if (!events || events.length === 0) {
            throw new Error('At least one event is needed');
        }
        const eventsSummary = await Promise.all(
            events.map(event => this.eventSummary(event))
        );

        return eventsSummary;
    }
}

