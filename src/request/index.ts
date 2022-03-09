import { BASE_URL, TOKEN_NAME } from '../config/network';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const service = axios.create({
  baseURL: BASE_URL, // 设置统一的请求前缀
});

service.interceptors.request.use((config: AxiosRequestConfig) => {
  // process config
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