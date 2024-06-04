import type { UserResponseData } from './type'

import request from '@/utils/request'

enum API {
  // 获取全部已有用户的账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
}

export function reqUserInfo(page: number, limit: number, username: string) {
  request.get<any, UserResponseData>(`${API.ALLUSER_URL}${page}/${limit}/?username=${username}`)
}
