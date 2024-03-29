/// <reference types="react-scripts" />
import { AxiosRequestConfig } from 'axios';

declare module '*.module.css' {   
  const classes: { 
    readonly [key: string]: string 
  };
  export default classes; 
}  
declare module '*.module.sass' {   
  const classes: { 
    readonly [key: string]: string 
  };   
  export default classes; 
}  
declare module '*.module.scss' {   
  const classes: { 
    readonly [key: string]: string 
  }; 
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'axios' {
  export interface AxiosInstance {
     <T = any>(config: AxiosRequestConfig): Promise<T>;
    request<T = any> (config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}