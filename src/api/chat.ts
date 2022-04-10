import { CreateMessageType } from './../typings/chat-message';
import request from '@/request';

export const createChat = (id: string) => {
  return request.post(`/chat/create/${id}`);
};

export const getUserList = () => {
  return request.get('/chat/userList');
};

export const createMessage = (createMessage: CreateMessageType) => {
  return request.post('/chat-message/create', createMessage);
};

export const getMessageListById = (id: string) => {
  return request.get(`/chat-message/list/${id}`);
};
