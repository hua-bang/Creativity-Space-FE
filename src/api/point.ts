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