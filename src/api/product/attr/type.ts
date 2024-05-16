export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface CategoryObj {
  id: number | string
  name: string
  category1ID?: number
  category2ID?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 属性与属性值的ts类型
// 已有属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrID?: number
}
// 存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]
// 属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryID: number
  categoryLevel: number
  attrValueList: AttrValueList[]
}
// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[]

// 属性接口返回的ts类型
export interface AttrReponseData extends ResponseData {
  data: Attr[]
}
