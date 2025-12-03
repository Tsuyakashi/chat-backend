const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    systemPrompt: String,
    messages: [
        {
            role: { type: String },
            content: { type: String },
            sentAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chats', chatSchema);