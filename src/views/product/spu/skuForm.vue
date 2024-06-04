<script setup lang='ts'>
import type { SkuData } from '@/api/product/spu/type'

import { reqAttr } from '@/api/product/attr'
import { reqAddSku, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu'

defineOptions({ name: 'SKUForm' })

const $emit = defineEmits(['changeScene'])

const attrArr = ref<any>([])
const saleArr = ref<any>([])
const imgArr = ref<any>([])
const table = ref<any>()

const skuParameter = reactive<SkuData>({
  category3ID: '',
  spuID: '',
  tmID: '',
  skuName: '',
  price: '',
  wight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',

})
// 子组件点击取消，通知父组件
function cancel() {
  $emit('changeScene', { flag: 0, params: '' })
}
async function initHasSkuData(c1ID: number | string, c2ID: number | string, spu: any) {
  // console.log(spu)
  skuParameter.category3ID = spu.category3Id
  skuParameter.spuID = spu.Id
  skuParameter.tmID = spu.tmId
  // 获取平台属性
  const attrResult = await reqAttr(c1ID, c2ID, spu.category3Id)
  // console.log(attrResult)
  const spuSaleAttrResult = await reqSpuHasSaleAttr(spu.id)
  const spuImageListResult = await reqSpuImageList(spu.id)
  attrArr.value = attrResult.data
  saleArr.value = spuSaleAttrResult.data
  imgArr.value = spuImageListResult.data
}
function handler(row: any) {
  imgArr.value.array.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  // 选中的图片才勾选
  table.value.toggleRowSelection(row, true)
  skuParameter.skuDefaultImg = row.imgUrl
}
async function save() {
  skuParameter.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  // 销售属性
  skuParameter.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev
  }, [])
  const result: any = await reqAddSku(skuParameter)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    })
    console.log(1111111)
    $emit('changeScene', { flag: 0, params: '' })
  }
  else {
    ElMessage({
      type: 'error',
      message: '添加SKU失败',

    })
  }
}
defineExpose({ initHasSkuData })
</script>

<template>
  <div class="box">
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input v-model="skuParameter.skuName" placeholder="SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuParameter.price" placeholder="价格（元）" type="number" />
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input v-model="skuParameter.wight" placeholder="重量（克）" type="number" />
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input v-model="skuParameter.skuDesc" placeholder="SKU描述" type="textarea" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-card>
          <el-form :inline="true">
            <el-form-item v-for="(item) in attrArr" :key="item.id" :label="item.attrName">
              <el-select v-model="item.saleAttrIdAndValueName">
                <el-option v-for="(attrValue) in item.attrValueList" :key="attrValue.id" :value="`${item.id}:${attrValue.valueName}`" :label="attrValue.valueName" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item v-for="(item) in saleArr" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.saleIdAndValueId">
              <el-option v-for="(saleAttrValue) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :value="`${item.id}:${saleAttrValue.id}`" :label="saleAttrValue.saleAttrValueName" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table ref="table" border :data="imgArr">
          <el-table-column width="80px" type="selection" align="center" />
          <el-table-column label="图片">
            <template #default="{ row }">
              <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="warning" size="small" @click="handler(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          size="default"
          @click="save"
        >
          保存
        </el-button>
        <el-button
          type="danger"
          size="default"
          @click="cancel"
        >
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>

</style>
