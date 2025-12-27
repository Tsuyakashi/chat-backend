import { Chat, CreateChatDto } from '../types/chatTypes'

export class ChatService {
    private chats: Chat[] = [
        {
            id: 1,
            chatOwner: 'someUser',
            messages: [
                { role: 'user', content: 'hello' },
                { role: 'assistant', content: 'hello back' }
            ]
        },
        {
            id: 2,
            chatOwner: 'anotherUser',
            messages: [
                { role: 'user', content: 'hello' },
                { role: 'assistant', content: 'hello back' }
            ]
        },

    ]

    private nextId = 3;

    async getAllChats(): Promise<Chat[]> {
        return this.chats
    }

    async getChatById(id: number, userId: string): Promise<Chat | undefined> {
        const chat = this.chats.find(chat => chat.id === id);

        if (!chat) {
            return undefined;
        }

        if (chat.chatOwner !== userId) {
            throw new Error('Unauthorized: You do not have access to this chat');
        } else {
            return chat;
        }
    }

    async createChat(dto: CreateChatDto): Promise<Chat> {
        const newChat: Chat = {
            id: this.nextId++,
            chatOwner: dto.chatOwner,
            messages: dto.systemPrompt
                ? [{ role: 'system', content: dto.systemPrompt }]
                : []
        }
        this.chats.push(newChat);
        return newChat;

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