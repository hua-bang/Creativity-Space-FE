import request from '@/request';

export function getTags() {
  return request('/tag/all').then(res => res.data);
}

export function getCategories() {
  return request('/category/all').then(res => res.data);
}

export function getAuthors() {
  return request('/user/author');
}

export function getAuthorById(id: string) {
  return request(`/user/author/${id}`);
}