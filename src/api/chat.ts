import request from '@/request';

export const createChat = (id: string) => {
  return request.post(`/chat/create/${id}`);
};

export const getUserList = () => {
  return request.get('/chat/userList');
};