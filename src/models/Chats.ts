// import mongoose, { Schema } from 'mongoose';
// import { IChatDocument } from '../types/mongooseTypes';

// const chatSchema = new Schema({
//     userId: { type: String, required: true },
//     systemPrompt: { type: String, required: false },
//     messages: [{
//         role: { type: String, required: true },
//         content: { type: String, required: true },
//         sentAt: { type: Date, default: Date.now }
//     }],
//     createdAt: { type: Date, default: Date.now }
// });

// export const ChatModel = mongoose.model<IChatDocument>('Chats', chatSchema);
