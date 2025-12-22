import { ChatModel } from '../models/Chats';
import { IChatService } from '../types/serviceTypes';
import { IChatDocument, IDeleteResult } from '../types/mongooseTypes';
import { ICreateChatData, IMessage } from '../types/chatTypes';
import { Types } from 'mongoose';

class ChatService implements IChatService {
    async getAllChats(): Promise<IChatDocument[]> {
        return ChatModel.find().sort({ createdAt: -1 }).exec();
    }

    async createChat(data: ICreateChatData): Promise<IChatDocument> {
        return ChatModel.create(data);
    }

    async getChatHistory(id: string): Promise<IChatDocument | null> {
        if (!Types.ObjectId.isValid(id)) {
            return null;
        }
        return ChatModel.findById(id).exec();
    }

    async deleteChat(id: string): Promise<IDeleteResult> {
        if (!Types.ObjectId.isValid(id)) {
            return { deletedCount: 0, acknowledged: true };
        }
        return ChatModel.deleteOne({ _id: new Types.ObjectId(id) }).exec();
    }

    async appendMessages(id: string, data: IMessage[]): Promise<IChatDocument | null> {
        if (!Types.ObjectId.isValid(id)) {
            return null;
        }
        return ChatModel.findByIdAndUpdate(
            id,
            { $push: { messages: { $each: data } } },
            { new: true }
        ).exec();
    }
}

export default new ChatService();