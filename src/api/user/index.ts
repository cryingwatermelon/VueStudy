// 统一管理项目用户相关的接口
import type { LoginForm, LoginResponseData, UserResponseData } from './type'

import request from '@/utils/request'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 暴露请求函数
/**
 * @description: 登录请求
 * @param {LoginForm} data
 */
export function reqlogin(data: LoginForm) {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data)
}

// userinfo interface
export function reqUserInfo() {
  return request.get<any, UserResponseData>(API.USERINFO_URL)
}

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
