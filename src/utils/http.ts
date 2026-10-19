import service from '@/utils/axios'
interface ResponseData{
    code:number;
    data:any;
    message:string;
}
// get请求
function get(url: string, params?: any): Promise<ResponseData> {
    return service.get(url, { params });
}
// post请求
function post(url: string, data?: any): Promise<ResponseData> {
    return service.post(url, data);
}  

export { get, post };