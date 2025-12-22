// src/types/controller.types.ts

import { Request, Response } from 'express';
import { 
  CreateChatRequest, 
  SendMessageRequest, 
  GetChatRequest, 
  DeleteChatRequest 
} from './expressTypes';

// Интерфейс для ChatController
export interface IChatController {
  getAllChats(req: Request, res: Response): Promise<void>;
  createChat(req: CreateChatRequest, res: Response): Promise<void>;
  getChatHistory(req: GetChatRequest, res: Response): Promise<void>;
  deleteChat(req: DeleteChatRequest, res: Response): Promise<void>;
  sendToChat(req: SendMessageRequest, res: Response): Promise<void>;
}