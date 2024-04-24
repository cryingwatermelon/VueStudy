//统一管理项目用户相关的接口
import request from "@/utils/request";
import type { LoginForm, LoginResponseData, UserResponseData } from "./type";
enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/user/info"
}
//暴露请求函数
//login interface
export const reqlogin = (data: LoginForm) => request.post<any, LoginResponseData>(API.LOGIN_URL, data);
//userinfo interface
export const reqUserInfo = () => request.get<any, UserResponseData>(API.USERINFO_URL);