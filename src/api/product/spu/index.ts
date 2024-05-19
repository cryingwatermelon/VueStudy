// 服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// SPU数据的ts类型
export interface SpuData {

  id?: number
  spuName: string
  description: string
  category3ID: string | number
  tmID: number// 后边定义
  spuImageList: null// 后边定义
  spuSaleAttrList: null// 后边再定义销售属性

//   spuImageList:null
}
// spu数组
export type Records = SpuData[]
// 接口返回已有SPU数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }

}
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
export interface AllTrademark extends ResponseData {
  data: Trademark[]
}
