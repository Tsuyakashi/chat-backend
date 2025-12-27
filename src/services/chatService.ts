import { Chat } from '../types/chatTypes'

export class ChatService {
    private chats: Chat[] = [
        {
            id: 1,
            chatOwner: 'SomeUser',
            messages: [
                { role: 'user', content: 'hello' },
                { role: 'assistant', content: 'hello back' }
            ]
        },
        {
            id: 2,
            chatOwner: 'AnotherUser',
            messages: [
                { role: 'user', content: 'hello' },
                { role: 'assistant', content: 'hello back' }
            ]
        },

    ]

    async getAllChats(): Promise<Chat[]> {
        return this.chats
    }
    
    async getChatById(id: number): Promise<Chat | undefined> {
        return this.chats.find(chat => chat.id === id)
    }
}



// class ChatService implements IChatService {
//     async getAllChats(): Promise<IChatDocument[]> {
//         return ChatModel.find().sort({ createdAt: -1 }).exec();
//     }

//     async createChat(data: ICreateChatData): Promise<IChatDocument> {
//         return ChatModel.create(data);
//     }

//     async getChatHistory(id: string): Promise<IChatDocument | null> {
//         if (!Types.ObjectId.isValid(id)) {
//             return null;
//         }
//         return ChatModel.findById(id).exec();
//     }

//     async deleteChat(id: string): Promise<IDeleteResult> {
//         if (!Types.ObjectId.isValid(id)) {
//             return { deletedCount: 0, acknowledged: true };
//         }
//         return ChatModel.deleteOne({ _id: new Types.ObjectId(id) }).exec();
//     }

//     async appendMessages(id: string, data: IMessage[]): Promise<IChatDocument | null> {
//         if (!Types.ObjectId.isValid(id)) {
//             return null;
//         }
//         return ChatModel.findByIdAndUpdate(
//             id,
//             { $push: { messages: { $each: data } } },
//             { new: true }
//         ).exec();
//     }
// }

// export default new ChatService();