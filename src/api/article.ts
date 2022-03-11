import request from '@/request';
import { CreateArticleType } from '@/typings/article';

export function createArticle(article: CreateArticleType) {
  return request({
    url: '/article/add',
    method: 'post',
    data: article
  });
}