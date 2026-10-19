import axios from "axios";
import type { AxiosError, AxiosInstance,AxiosResponse,InternalAxiosRequestConfig } from "axios";
import {ElNotification} from "element-plus";
const service: AxiosInstance = axios.create({
    baseURL: "https://www.demo.com/",  //后面会把他替换成环境变量
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use((config:InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
},(error:AxiosError) => {
    ElNotification.error({
        title: 'Error',
        message: error.message
    });
    // 抛出错误信息
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use((response:AxiosResponse) => {
    console.log("响应拦截器",response)
    if(response.data.code !== 200){
        ElNotification.error({
            title: 'Error',
            message: response.data.message,
            type: 'error',
        });
    } 
    // 对响应数据做点什么
    return response.data;
},(error:AxiosError) => {
   ElNotification.error({
        title: 'Error',
        message: error.message
    });
    // 抛出错误信息
    return Promise.reject(error);
});

export default service;