import type { SkuResponseData } from './type'

import request from '@/utils/request'

enum API {
  // 获取已有的商品数据
  SKU_URL = '/admin/product/list/',
  // 上架
  SALE_URL = '/admin/product/onSale/',
  // 下架
  CANCELSALE_URL = '/admin/product/cancelSale/',
  // 获取商品详细的商品
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除已有的SKU
  DELETESKU_URL = '/admin/product/deleteSku/',
}
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(`${API.SKU_URL}${page}/${limit}`)
export function reqSaleSku(id: number) {
  return request.get<any, any>(`${API.SALE_URL}${id}`)
}
export function reqCancelSale(id: number) {
  return request.get<any, any>(`${API.CANCELSALE_URL}${id}`)
}
export const reqSkuInfo = (id: number) => request.get<any, any>(API.SKUINFO_URL + id)
export function reqRemoveSku(id: number) {
  return request.delete<any, any>(`${API.DELETESKU_URL}${id}`)
}
