import { Request } from 'express';
import { ISendMessageData, ICreateChatData } from './chatTypes';

// Расширение Express Request для типизации body
export interface CreateChatRequest extends Request {
  body: ICreateChatData;
}

export interface SendMessageRequest extends Request {
  body: ISendMessageData;
  params: {
    id: string;
  };
}

export interface GetChatRequest extends Request {
  params: {
    id: string;
  };
}

export interface DeleteChatRequest extends Request {
  params: {
    id: string;
  };
}