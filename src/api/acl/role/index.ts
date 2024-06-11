// 角色管理模块接口
import type { MenuResponseData, RoleData, RoleResponseData } from './type'

import request from '@/utils/request'
// 地址
enum API {
  // 获取全部的职位接口
  ALLROLE_URL = '/admin/acl/role/',
  // 新增岗位的接口地址
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新已有职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 获取全部的菜单和权限
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  // 给选中的用户分配权限
  SETPRERMISSION_URL = '/admin/acl/role/permission/doAssign/?',
}
// 获取全部的角色
export function reqAllRoleList(page: number, limit: number, roleName: string) {
  return request.get<any, RoleResponseData>(`${API.ALLROLE_URL}${page}/${limit}/?roleName=${roleName}`)
}
// 添加或者新增已有职位接口
export function reqAddOrUpdateRole(data: RoleData) {
  if (data.id)
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  else
    return request.post<any, any>(API.ADDROLE_URL, data)
}
// 根据角色获取菜单
export function reqALLMenuList(id: number) {
  return request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + id)
}
//  给职位分配权限
export function reqSetPermission(roleId: number, permissionId: number) {
  return request.post(`${API.SETPRERMISSION_URL}roleId=${roleId}&permissionId=${permissionId}`)
}
