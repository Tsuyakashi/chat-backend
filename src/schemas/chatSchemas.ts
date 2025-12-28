export const getAllChatsSchema = {
    querystring: {
        type: 'object',
        properties: {
            userId: { type: 'string' }
        },
        required: ['userId'],
    },
};


export const getChatByIdSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
        },
        required: ['id']
    },
    querystring: {
        type: 'object',
        properties: {
            userId: { type: 'string' },
        },
        required: ['userId'],
    },
};

export const createChatSchema = {
    body: {
        type: 'object',
        properties: {
            userId: { type: 'string' },
            systemPrompt: { type: 'string' },
        },
        required: ['userId'],
    },
};

export const sendToChatSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            userId: { type: 'string' },
            message: { type: 'string' },
        },
        required: ['userId', 'message'],
    },
};