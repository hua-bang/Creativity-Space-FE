import request from '@/request';
import { CreateBookletType, UpdateBookletType } from './../typings/booklet';

export const getBookletList = () => {
  return request.post('/booklet/all');
};

export const createBooklet = (booklet: CreateBookletType) => {
  return request.post('/booklet/create', booklet);
};

export const updateBooklet = (booklet: UpdateBookletType) => {
  return request.post('/booklet/update', booklet);
};

export const getBookletDetail = (id: string) => {
  return request(`/booklet/detail/${id}`);
};