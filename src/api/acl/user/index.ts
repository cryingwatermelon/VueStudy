import type { AllRoleResponseData, SetRoleData, User, UserResponseData } from './type'

import request from '@/utils/request'

enum API {
  // 获取全部已有用户的账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新一个用户
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部职位，当前账户拥有的职位
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 给用户分配角色
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某个账户
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export function reqUserInfo(page: number, limit: number, username: string) {
  return request.get<any, UserResponseData>(`${API.ALLUSER_URL}${page}/${limit}/?username=${username}`)
}
// 添加或则修改已有用户的接口
export function reqAddOrUpdateUser(data: User) {
  if (data.id)
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  else
    return request.post<any, any>(API.ADDUSER_URL, data)
}
// 获取全部职位已经包含当前用户的已有职位
export function reqAllRole(userId: number) {
  return request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
}
export function reqSetUserRole(data: SetRoleData) {
  return request.post<any, any>(API.SETROLE_URL, data)
}

export function reqRemoveUser(userId: number) {
  return request.delete<any, any>(API.DELETEUSER_URL + userId)
}

export function reqSelectUser(idList: number[]) {
  return request.delete(API.DELETEALLUSER_URL, { data: idList })
}
