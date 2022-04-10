import { Chat } from './chat';
import { User } from "./user";

export enum ChatUserStatusEnum {
  FORBIDDEN = -1,
  NORMAL = 1,
}

export interface ChatUser {
  id: string;

  chat_id: string;

  user_id: string;

  other_user_id: string;

  unread_count: number;

  last_time: number;

  last_message: string;

  status: number;

  user: User;

  other_user: User;

  chat: Chat;
}
