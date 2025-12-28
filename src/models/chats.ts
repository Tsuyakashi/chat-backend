import mongoose, { Schema } from 'mongoose';
import { IChatDocument } from '../types/mongooseTypes'

export const messageSchema = new Schema({
    role: { type: String, enum: ['system', 'assistant', 'user'], required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
}, { _id: false });

export const chatSchema = new Schema({
    userId: { type: String, required: true },
    messages: [messageSchema],
}, { timestamps: true });

export const ChatModel = mongoose.model<IChatDocument>('Chat', chatSchema);