import { ChatUser } from './chat-user';
export enum ChatStatusEnum {
  FORBIDDEN = -1,
  NORMAL = 1,
}

export enum ChatTypeEnum {
  SINGLE = 1,
  GROUP = 2,
}

export interface Chat {
  id: string;

  status: ChatStatusEnum;

  type: ChatTypeEnum;

  owner_id: string;

  update_time: string;

  chat_users: ChatUser[];
}