import { updateArticle } from '@/api/article';
import request from '@/request';
import { CreateBookletType, UpdateBookletType } from './../typings/booklet';
import { UpdateBookletArticleType, CreateBookletArticleType } from '@/typings/booklet-article';

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

export const getArticlesByBookletId = (id: string) => {
  return request(`/booklet-article/booklet/${id}`);
};

export const getBookletArticleById = (id: string) => {
  return request(`/booklet-article/detail/${id}`);
};

export const getBookletListByUserId = (id: string) => {
  return request(`/booklet/user/${id}`);
};

export const updateBookletArticle = (articleId: string, data: UpdateBookletArticleType) => {
  return request.post(`/booklet-article/update/${articleId}`, data);
};

export const createBookletArticle = (data: CreateBookletArticleType) => {
  return request.post('/booklet-article/create', data);
};

export const deleteBookletArticle = (bookletId: string, articleId: string) => {
  return request.post('/booklet-article/delete', {
    booklet_id: bookletId,
    article_id: articleId
  });
};