import { loginApi } from "@/api/user";
import { defineStore } from "pinia";
interface LoginParams{
    username:string;
    password:string;
}
export const useAuthStore = defineStore("user", {
    state: () => ({
        token: sessionStorage.getItem("token") || "",
        roles: sessionStorage.getItem("roles") ? JSON.parse(sessionStorage.getItem("roles")!) : [],
        username: sessionStorage.getItem("username") || "",
        menu: sessionStorage.getItem("menu") ? JSON.parse(sessionStorage.getItem("menu")!) : [],
    }),
    // 请求响应数据
    actions: {
        async login(data:LoginParams,router:any) {
            // 调用登录接口
            try {
                // 接口返回结构：{ data: { token, user: { username, roles }, menulist } }
                const {data:{token,user:{username,roles},menulist}}= await loginApi(data);
                // 1.存pinia:将token、roles、username、menu存储到state中(pinia响应式)
                this.token = token;
                this.roles = roles;
                this.username = username;
                this.menu = menulist;
                // 2.存本地存储：将token、roles、username、menu存储到sessionStorage中
                sessionStorage.setItem("token", token);
                // 将roles数组转换为JSON字符串存储，用的时候再用JSON.parse()转换回来
                sessionStorage.setItem("roles", JSON.stringify(roles));
                sessionStorage.setItem("username", username);
                // 将menu数组转换为JSON字符串存储，用的时候再用JSON.parse()转换回来
                sessionStorage.setItem("menu", JSON.stringify(menulist));
                router.push("/");
            }catch (error) {
                throw new Error("登录失败");
            }
        }
    }
})