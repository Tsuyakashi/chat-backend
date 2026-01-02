import { getResponse } from './openRouterService';
import { Message } from '../types/chatTypes';
import { Event } from '../types/eventTypes';
import { config } from '../config';
import { databaseService } from './databaseService';

export class EventService {
    private async eventSummary(event: Event): Promise<string> {
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

        // Собираем уникальные descriptions из markets (убираем дубликаты)
        const marketsDescriptions = event.markets
            ?.map((market, index) => `${index + 1}. ${market.description}`)
            .join('\n\n') || '';

        // Проверяем, не дублируется ли event.description с единственным market.description
        const isSingleMarketDuplicate = event.markets?.length === 1 &&
            event.description === event.markets[0].description;

        let context = '';

        // Добавляем event.description только если он не дублирует market.description
        if (event.description && !isSingleMarketDuplicate) {
            context += `Event description: ${event.description}`;
        }

        // Добавляем markets descriptions
        if (marketsDescriptions) {
            if (context) context += '\n\n';
            context += `Markets descriptions:\n${marketsDescriptions}`;
        }

        // Финальная проверка
        if (!context.trim()) {
            throw new Error('Event must have either description or markets with descriptions');
        }

        const promptChain: Message[] = [
            {
                role: 'system',
                content: config.events.prompt,
                sentAt: new Date(),
            },
            {
                role: 'user',
                content: context,
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

