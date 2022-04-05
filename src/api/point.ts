import request from '@/request';
import { CreatePointType } from '@/typings/point';
import { CreateCommentType} from '@/typings/comment';

export function getAllPoint() {
  return request('/point/all');
}

export function creatPoint(point: CreatePointType) {
  return request({
    url: '/point/add',
    data: point,
    method: 'post'
  });
}

export function getPointById(pointId: string) {
  return request(`/point/${pointId}`);
}

export function getCommentByPointId(pointId: string) {
  return request(`/point-comment/point/${pointId}`);
}


export function getPointByUserId(userId: string) {
  return request(`/point/user/${userId}`);
}

export function createComment(comment: CreateCommentType) {
  return request.post('/point-comment/add', comment);
}

export function deleteComment(commentId: string) {
  return request.post(`/point-comment/delete/${commentId}`);
}

export function likePoint(id: string) {
  return request.get(`/point/like/${id}`);
}

export function getPointTag() {
  return request.get('/point-tag/all');
}