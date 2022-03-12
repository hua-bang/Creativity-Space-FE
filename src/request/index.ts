import { BASE_URL } from '../config/network';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/utils/token';

const service = axios.create({
  baseURL: BASE_URL, // 设置统一的请求前缀
});

service.interceptors.request.use((config: AxiosRequestConfig) => {
  // process config
  const token = getToken() ?? '';
  config.headers = Object.assign({}, config.headers, {
    Authorization: `Bearer ${token}`
  });
  return config;
});

service.interceptors.response.use(
  (res: AxiosResponse) => {
    
    if (res.data.code === 200) {
      return res.data;
    }
    
    return Promise.reject(res.data);
  },
  (err) => {
    const res = err.response;
    console.log(err);
    throw res.data;
  },
);

// 请求配置
export function createRequest(
  requestConfig: AxiosRequestConfig,
) {
  return axios.create(requestConfig);
}

export default service;