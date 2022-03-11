import request from '@/request';

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
  return request.get('/auth/userInfo');
}
