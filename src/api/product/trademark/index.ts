// 品牌管理模块接口
import type { TradeMark, TradeMarkResponseData } from './type'

import request from '@/utils/request'

enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌
  ADDTRADEMARK_URL = 'admin/product/baseTrademark/save',
  // 修改品牌
  UPDATETRADEMARK_URL = 'admin/product/baseTrademark/update',
  // 删除品牌
  DELETERADEMARK_URL = 'admin/product/baseTrademark/remove',
}
// 定义获取已有品牌接口的方法
// page 获取第几页 limit 获取几个
export function reqHasTrademark(page: number, limt: number): any {
  return request.get<TradeMarkResponseData>(`${API.TRADEMARK_URL}${page}/${limt}`)
}

export function reqAddOrUpdateTrademark(data: TradeMark) {
  if (data.id) {
    // 有id了说明是修改
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  }
  else {
    // 之前没有id说明是新增
    return request.put<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export function reqDeleteTrademark(id: number) {
  return request.delete<any, any>(API.DELETERADEMARK_URL + id)
}
