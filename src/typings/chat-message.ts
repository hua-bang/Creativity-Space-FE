import { User } from '@/typings/user';
export enum ChatMessageStatusEnum {
  FORBIDDEN = -1,
  NORMAL = 1,
}

export enum ChatMessageTypeEnum {
  MESSAGE = 1,
  URL = 2,
  IMAGE = 3,
  ARTICLE
}

export interface ChatMessage {
  id: string;
  content: string;
  user_id: string;
  create_time: string;
  update_time: string;
  type: ChatMessageTypeEnum;
  status: ChatMessageStatusEnum;
  chat_id: string;
  user?: User;
}

export type CreateMessageType = Pick<
  ChatMessage, 
  'chat_id' | 'content' | 'type'
>
