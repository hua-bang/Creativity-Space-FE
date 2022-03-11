import request from '@/request';
import { CreateArticleType } from '@/typings/article';

export function createArticle(article: CreateArticleType) {
  return request({
    url: '/article/add',
    method: 'post',
    data: article
  });
}

export function getArticles() {
  return request('/article/all');
}

export function getArticleById(articleId: string) {
  return request(`/article/${articleId}`);
}