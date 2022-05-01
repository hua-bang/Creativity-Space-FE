import { CreateArticleComment } from './../typings/comment';
import request from '@/request';
import { CreateArticleType, UpdateArticleType, QueryArticleDto } from '@/typings/article';

export function createArticle(article: CreateArticleType) {
  return request({
    url: '/article/add',
    method: 'post',
    data: article
  });
}

export function deleteArticle(id: string) {
  return request.post(`/article/user/delete/${id}`);
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

export function uploadArticleImg(file: File) {
  const params = new FormData();
  params.append('file', file);
  return request.post('/cos/article/upload', params);
}

export function likeArticle(articleId: string) {
  return request.get(`/article/like/${articleId}`);
}

export function getArticleLikeInfo(articleId: string) {
  return request.get(`/article/user/like/info/${articleId}`);
}

export function followArticle(articleId: string) {
  return request.get(`/article/follow/${articleId}`);
}

export function createComment(comment: CreateArticleComment) {
  return request.post('/article-comment/create', comment);
}

export function getCommentByArticleId(articleId: string) {
  return request.get(`/article-comment/article/${articleId}`);
}

export function updateArticle(article: UpdateArticleType) {
  return request.post('/article/update', article);
}

export function deleteComment(commentId: string) {
  return request.post(`/article-comment/delete/${commentId}`);
}

export const queryArticleList = (queryArticleDto: QueryArticleDto) => {
  return request.post('/article/queryByUser', queryArticleDto);
};

export const getArticleDetailById = (id: string) => {
  return request.get(`/article/${id}`);
};
