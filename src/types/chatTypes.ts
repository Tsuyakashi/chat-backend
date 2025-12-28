export interface Message {
    role: 'system' | 'assistant' | 'user';
    content: string;
    sentAt: Date;
}

export interface Chat {
    id: string;
    userId: string; // chat owner id
    messages: Message[];
}

export interface GetChatByIdParams {
    id: string
}

export interface CreateChatDto {
    userId: string; // chat owner id
    systemPrompt?: string;
}
