// 商品分类全局组件的小仓库
import { defineStore } from 'pinia'

import { reqC1, reqC2, reqC3 } from '@/api/product/attr'

export const useCategoryStore = defineStore('Category', () => {
  const c1Arr = ref<any>({})
  const c2Arr = ref<any>({})
  const c3Arr = ref<any>({})
  // 存储一级分类的id
  const c1ID = ref<number | string>('')
  const c2ID = ref<number | string>('')
  const c3ID = ref<number | string>('')
  // const c1ID = "";
  async function getC1() {
    const result = await reqC1()
    if (result.code === 200)
      c1Arr.value = result.data
  }
  async function getC2() {
    const result = await reqC2(c1ID.value)
    if (result.code === 200)
      c2Arr.value = result.data
  }

  async function getC3() {
    const result = await reqC3(c2ID.value)
    if (result.code === 200)
      c3Arr.value = result.data
  }

  return { getC1, getC2, getC3, c1Arr, c2Arr, c3Arr, c1ID, c2ID, c3ID }
})
export default useCategoryStore
