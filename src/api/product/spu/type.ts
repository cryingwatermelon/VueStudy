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
  tmID: number | string
  spuImageList: null | SpuImg[]
  spuSaleAttrList: null | SaleAttr[]

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

// 商品图片的ts类型
export interface SpuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}
// 已有spu照片墙数据的类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
// 已有的销售属性值对象
export interface SaleAttrValue {
  id?: string
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
// 存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[]

// 销售属性
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}
// SPU已有销售属性接口

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
// 已有全部SPU返回数据
export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
export interface SkuData {
  category3ID: string | number
  spuID: string | number
  tmID: string | number
  skuName: string
  price: string | number
  wight: string | number
  skuDesc: string | number
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: SaleAttr[]
  skuDefaultImg: string
}
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}

// const test = {
//   'name': 'zhangsan',
//   'age': 18,
//   'name-zh': '章三',
// }
// JSON.stringify(test)
// console.log(test['name-zh'])
