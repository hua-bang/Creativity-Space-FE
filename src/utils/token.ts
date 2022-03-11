import { TOKEN_NAME } from '@/config/network';

export function getToken() {
  return  JSON.parse(localStorage.getItem(TOKEN_NAME) || '');
}

export function setToken(val: string) {
  return localStorage.setItem(TOKEN_NAME, val);
}