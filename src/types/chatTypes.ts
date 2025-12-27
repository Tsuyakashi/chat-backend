export interface Message {
    role: 'system' | 'assistant' | 'user';
    content: string;
}

export interface Chat {
    id: number;
    chatOwner: string;
    messages: Message[];
}