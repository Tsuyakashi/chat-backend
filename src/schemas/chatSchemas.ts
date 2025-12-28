export const sendToChatSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            userId: { type: 'string' },
            message: {
                type: 'object',
                properties: {
                    role: { type: 'string', enum: ['system', 'assistant', 'user'] },
                    content: { type: 'string' }
                },
                required: ['role', 'content']
            }
        },
        required: ['userId', 'message']
    }
};