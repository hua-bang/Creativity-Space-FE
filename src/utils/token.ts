import { TOKEN_NAME } from '@/config/network';

export function getToken() {
  const tokenValue = localStorage.getItem(TOKEN_NAME);
  return tokenValue ? JSON.parse(tokenValue) : '';
}

export function setToken(val: string) {
  return localStorage.setItem(TOKEN_NAME, val);
}