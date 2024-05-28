import type { Attr, AttrReponseData, CategoryResponseData } from './type'

import request from '@/utils/request'

enum API {
  // 获取一级分类的接口地址
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类的接口地址
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类的接口地址
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下已有的属性和属性值
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加修改
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除
  DELETEATTR_URL = '/admin/product/deleteAttr',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
export function reqC2(category1ID: number | string) {
  return request.get<any, CategoryResponseData>(API.C2_URL + category1ID)
}
export function reqC3(category2ID: number | string) {
  return request.get<any, CategoryResponseData>(API.C3_URL + category2ID)
}
export function reqAttr(category1ID: string | number, category2ID: string | number, category3ID: string | number) {
  return request.get<any, AttrReponseData>(
    `${API.ATTR_URL}${category1ID}/${category2ID}/${category3ID}`,
  )
}
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
export const reqRemoveAttr = (attrID: number) => request.delete<any, any>(API.DELETEATTR_URL + attrID)
