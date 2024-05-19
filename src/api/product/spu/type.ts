import type { AllTrademark, HasSpuResponseData } from '.'

import request from '@/utils/request'

enum API {
  // 获取已有的SPU数据
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTademarkList',
  // 获取某个SPU下的全部售卖商品的图片数据
  TMAGE_URL = '/admin/product/spuImageList',
}

// 获取某一个三级分类下所有已有的SPU数据

export const reqHasSpu = (page: number, limit: number, category3ID: string | number) => request.get<any, HasSpuResponseData>(`${API.HASSPU_URL}${page}/${limit}?category3ID=${category3ID}`)
// 获取全部SPU的品牌数据
export const reqAllTradeMark = () => request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)
