export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface Attr {
  id?: number
  attrID: number | string
  valueID: number | string
}

export interface saleAttr {
  id?: number
  saleAttrID: number | string
  saleAttrValueID: number | string
}

export interface SkuData {
  category3ID?: string | number
  spuID?: string | number
  tmID?: string | number
  skuName?: string
  price?: string | number
  wight?: string | number
  skuDesc?: string | number
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleAttr[]
  skuDefaultImg?: string
  isSale?: number
  id?: number
}
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizaCountSql: boolean
    hitCount: boolean
    countID: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

export interface SkuInfoData extends ResponseData {
  data: SkuData
}
