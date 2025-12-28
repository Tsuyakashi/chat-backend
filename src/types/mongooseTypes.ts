import { Document } from "mongoose"

export interface IChatDocument extends Document {
    userId: string;
    messages: Array<{
        role: 'system' | 'assistant' | 'user';
        content: string;
        sentAt: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}