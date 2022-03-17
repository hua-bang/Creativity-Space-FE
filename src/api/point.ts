import request from '@/request';
import { CreatePointType } from '@/typings/point';

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