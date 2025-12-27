export interface Message {
    role: 'system' | 'assistant' | 'user';
    content: string;
}

export interface Chat {
    id: number;
    chatOwner: string;
    messages: Message[];
}

export interface GetChatByIdParams {
    id: string
}

export interface CreateChatDto {
    chatOwner: string;
    systemPrompt?: string;
}
