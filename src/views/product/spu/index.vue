<script setup lang="ts">
import { Delete, Edit, Plus, View } from '@element-plus/icons-vue'

import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'

import type { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type'

import { reqHasSpu } from '@/api/product/spu/index'
import useCategoryStore from '@/store/modules/category'

defineOptions({ name: 'SPU' })

const scene = ref<number>(0)// 场景0 显示已有的SPU 1 添加修改SPU 2 添加SKU

const categoryStore = useCategoryStore()

const pageNo = ref(4)
const pageSize = ref(3)

const records = ref < Records >([])
const total = ref<number>(0)
// 获取子组件实例SpuForm
const spuRef = ref<any>()
// 获取子组件实例SkuForm
const skuRef = ref<any>()
// 存储全部的SKU数据
// const skuArr=ref<>

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
}

function updateSpu(row: SpuData) {
  scene.value = 1
  // 调用子组件实例方法获取完整的已有SPU数据
  spuRef.value.initHasSpuData(row)
  // console.log(row)可以拿到
  // console.log(spuRef.value)
}
// 子组件spuForm绑定自定义事件，目前是让子组件通知父组件切换场景为0
function changeScene(num: number) {
  scene.value = num
}
</script>

<template>
  <div>
    <Category :scene="scene" />
    <div v-show="scene === 0">
      <el-card style="margin-top: 10px;">
        <el-button type="primary" size="default" :icon="Plus" @click="addSpu">
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
                  type="primary" size="small" :icon="Plus" title="添加SPU" @click="addSpu"
                />
                <el-button
                  type="warning" size="small" :icon="Edit" title="修改SPU" @click="updateSpu(row)"
                />
                <el-button type="info" size="small" :icon="View" title="查看SPU" />

                <el-button type="danger" size="small" :icon="Delete" title="删除SPU" />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          style="margin: 10px,0px;"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </el-card>
    </div>

    <spuForm v-show="scene === 1" ref="spuRef" @change-scene="changeScene" />
    <skuForm v-show="scene === 2" ref="skuRef" @change-scene="changeScene" />
  </div>
</template>

<style scoped lang="scss"></style>

/**
 *SPU 标准化产品单元 产品描述,销售属性 （类）
 *SKU 标准库存单元（实例）库存最小单元
 */
