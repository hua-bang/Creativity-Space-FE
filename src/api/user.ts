import request from '@/request';
import { setToken } from '@/utils/token';
import { UserBasicInfo, UpdatePasswordInfo } from '@/typings/user';

export function signUp(username: string, password: string) {
  return request.post('/auth/signUp', {
    username,
    password
  });
}

export function signIn(username: string, password: string) {
  return request.post('/auth/signIn', {
    username,
    password
  });
}

export function getUserInfo() {
  return request.get('/user/info');
}

export function logout() {
  setToken('');
  window.location.reload();  
}

export function setUserInfo(info: UserBasicInfo) {
  return request.post('/user/update', info);
}

export function updatePassword(info: UpdatePasswordInfo) {
  return request.post('/auth/updatePassword', info);
}

export function getUserStaticInfo() {
  return request.get('/admin/user/static/info');
}

export function applyBookletAuthor() {
  return request.post('/user/applyBookletAuthor');
}