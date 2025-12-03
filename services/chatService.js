const Chats = require('../models/Chats')

class ChatService {
    async getAllChats(){
        return Chats.find().sort({ createdAt: -1 });    
    }
    
    async createChat(data){
        return Chats.create(data);
    }

    async getChatHistory(id){
        return Chats.findById(id);
    }

    async deleteChat(id){
        return Chats.deleteOne({ _id: id });
    }

    async appendMessages(id, data) {
        return Chats.findByIdAndUpdate(
            id,
            { $push: { messages: { $each: data } } },
            { new: true }
        );
    }
}

module.exports = new ChatService();