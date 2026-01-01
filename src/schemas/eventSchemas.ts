export const eventSchema = {
    body: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                category: { type: 'string' },
                id: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                endDate: { type: 'string' },
                markets: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            yesLabel: { type: 'string' },
                            noLabel: { type: 'string' },
                            id: { type: 'string' },
                            title: { type: 'string' },
                            chance: { type: 'number' },
                            description: { type: 'string' }
                        },
                        required: ['id', 'title', 'description']
                    },
                    minItems: 1,
                },
            },
            required: ['id', 'title', 'description', 'endDate', 'markets']
        },
        minItems: 1
    }
}