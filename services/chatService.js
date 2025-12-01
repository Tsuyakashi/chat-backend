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
}

module.exports = new ChatService();