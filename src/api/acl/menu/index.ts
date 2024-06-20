import type { MenuParameter, PermissionResponseData } from './type'

import request from '@/utils/request'
// 地址
enum API {
  // 获取全部菜单与按钮的标识数据
  ALLPERMISSION_URL = '/admin/acl/permission',
  // 给一级菜单增加子菜单
  ADDMENU_URL = '/admin/acl/permission/save',
  // 更新已有的菜单
  UPDATEMENU_URL = '/admin/acl/permission/update',
  // 删除
  DELETEMENU_URL = '/admin/acl/permission/remove/',

}
export function reqAllPermission() {
  return request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
}
export function reqAddOrUpdateMenu(data: MenuParameter) {
  if (data.id)
    return request.put<any, any>(API.UPDATEMENU_URL, data)

  return request.post<any, any>(API.ADDMENU_URL, data)
}

export function reqRemoveMenu(id: number) {
  return request.delete<any, any>(API.DELETEMENU_URL + id)
}
