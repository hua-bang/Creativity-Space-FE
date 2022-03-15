import request from '@/request';
import { CreateArticleType } from '@/typings/article';

export function createArticle(article: CreateArticleType) {
  return request({
    url: '/article/add',
    method: 'post',
    data: article
  });
}

export function getArticles(data?: Record<string, string>) {
  return request.post('/article/all', data);
}

export function getArticleById(articleId: string) {
  return request(`/article/${articleId}`);
}

export function getArticleByAuthorId(authorId: string) {
  return request.post(`/article/authorId/${authorId}`);
}