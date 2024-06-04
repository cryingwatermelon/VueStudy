<script setup lang="ts">
import { Delete, Edit, Plus, View } from '@element-plus/icons-vue'
// import { TitleComponent } from 'echarts/components'

import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'

import type { HasSpuResponseData, Records, SkuData, SkuInfoData, SpuData } from '@/api/product/spu/type'

import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu/index'
import useCategoryStore from '@/store/modules/category'

defineOptions({ name: 'SPU' })

const scene = ref<number>(0)// 场景0 显示已有的SPU 1 添加修改SPU 2 添加SKU

const categoryStore = useCategoryStore()

const pageNo = ref(1)
const pageSize = ref(3)

const records = ref < Records >([])
const total = ref<number>(0)
// 获取子组件实例SpuForm
const spuRef = ref<any>()
// 获取子组件实例SkuForm
const skuRef = ref<any>()
// 存储全部的SKU数据
const skuArr = ref<SkuData[]>([])
const show = ref<boolean>(false)

async function getHasSpu(pager = 1) {
  pageNo.value = pager
  const result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3ID)
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
// 监听三级分类ID的变化
watch(() => categoryStore.c3ID, () => {
// 当三级ID变化的时候先清空之前的数据
  records.value = []
  if (!categoryStore.c3ID)
    return
  getHasSpu()
})

function changeSize() {
  getHasSpu()
}

function addSpu() {
  scene.value = 1
  spuRef.value.initAddSpu(categoryStore.c3ID)
}

function updateSpu(row: SpuData) {
  scene.value = 1
  // 调用子组件实例方法获取完整的已有SPU数据
  spuRef.value.initHasSpuData(row)
  // console.log(row)可以拿到
  // console.log(spuRef.value)
}
function changeScene(obj: any) {
  // 子组件Spuform点击取消变为场景0:展示已有的SPU
  scene.value = obj.flag
  if (obj.params === 'update') {
    // 更新留在当前页
    getHasSpu(pageNo.value)
  }
  else {
    // 添加留在第一页
    getHasSpu()
  }
}
function addSku(row: SkuData) {
  scene.value = 2
  skuRef.value.initHasSkuData(categoryStore.c1ID, categoryStore.c2ID, row)
}

async function findSku(row: SpuData) {
  const result: SkuInfoData = await reqSkuList((row.id as number))
  // console.log(result)
  if (result.code === 200) {
    show.value = true
    skuArr.value = result.data
  }
  // console.log(skuArr.value)
}
async function deleteSku(row: SpuData) {
  const result = await reqRemoveSpu(row.id as number)
  // console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
  else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin-top: 10px;">
      <div v-show="scene === 0">
        <el-button
          type="primary" size="default" :icon="Plus" :disabled="categoryStore.c3ID ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <div>
          <el-table style="margin: 10px,0px;" border :data="records">
            <el-table-column label="序号" type="index" align="center" width="80px" />
            <el-table-column label="SPU名称" align="center" prop="spuName" />
            <el-table-column label="SPU描述" align="center" prop="description" show-overflow-tooltip />
            <el-table-column label="SPU操作" align="center">
              <template #default="{ row }">
                <el-button
                  plain type="primary" size="small" :icon="Plus" title="添加SKU" @click="addSku(row)"
                />
                <el-button
                  type="warning" size="small" :icon="Edit" title="修改SPU" @click="updateSpu(row)"
                />
                <el-button plain type="info" size="small" :icon="View" title="查看SKU" @click="findSku(row)" />
                <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px" @confirm="deleteSku(row)">
                  <template #reference>
                    <el-button type="danger" size="small" :icon="Delete" title="删除SPU" />
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          style="margin: 10px,0px;"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <spuForm v-show="scene === 1" ref="spuRef" @change-scene="changeScene" />
      <skuForm v-show="scene === 2" ref="skuRef" @change-scene="changeScene" />
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName" />
          <el-table-column label="SKU价格" prop="price" />
          <el-table-column label="SKU重量" prop="weight" />
          <el-table-column label="SKU图片">
            <template #default="{ row }">
              <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>

/**
 *SPU 标准化产品单元 产品描述,销售属性 （类）
 *SKU 标准库存单元（实例）库存最小单元
 */
