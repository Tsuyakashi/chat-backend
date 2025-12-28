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
            message: { type: 'string' }
        },
        required: ['userId', 'message']
    }
};