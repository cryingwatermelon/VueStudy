import type { AllTrademark, HasSaleAttrResponseData, HasSpuResponseData, SaleAttrResponseData, SpuHasImg } from './type'

import request from '@/utils/request'

enum API {
  // 获取已有的SPU数据
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某个SPU全部的已有销售属性
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性(eg:颜色，版本，尺码)
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 追加一个新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的SPU
  UPDATE_URL = '/admin/product/updateSpuInfo',
  // 查看某个SPU下全部售卖的商品

}

// 获取某一个三级分类下所有已有的SPU数据
export const reqHasSpu = (page: number, limit: number, category3ID: string | number) => request.get<any, HasSpuResponseData>(`${API.HASSPU_URL}${page}/${limit}?category3Id=${category3ID}`)
// 获取全部SPU的品牌数据
export const reqAllTradeMark = () => request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)
// 获取某一个spu下的全部图片
export const reqSpuImageList = (spuId: number) => request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
//  获取某一个已有SPU的多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
// 获取所有的销售属性
export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
// 更新已有的SPU
export function reqAddOrUpdateSpu(data: any) {
  if (data.id)
    return request.post<any, any>(API.UPDATE_URL, data)

  else
    request.post<any, any>(API.ADDSPU_URL, data)
}
