<script setup lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import type { Attr, AttrReponseData } from '@/api/product/attr/type'

import { reqAddOrUpdateAttr, reqAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'

defineOptions({ name: 'Attr' })
const categoryStore = useCategoryStore()
// 存储已有的属性与属性值
const attrArr = ref<Attr[]>([])
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryID: 0,
  categoryLevel: 3,
})
// 监听仓库三级分类ID变化
watch(
  () => categoryStore.c3ID,
  () => {
    // 清空上一次查询的属性
    attrArr.value = []
    // 先确保有三级分类
    if (!categoryStore.c3ID)
      return
    getAttr()
  },
)
// 获取已有的属性与属性值方法
async function getAttr() {
  const { c1ID, c2ID, c3ID } = categoryStore
  const result: AttrReponseData = await reqAttr(c1ID, c2ID, c3ID)
  if (result.code === 200)
    attrArr.value = result.data
}
// 控制场景切换 0显示table 1显示添加修改
const scene = ref<number>(0)
function addAttr() {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryID: categoryStore.c3ID,
    categoryLevel: 3,

  })
  scene.value = 1
}

function updateAttr() {
  scene.value = 1
}
function cancel() {
  scene.value = 0
}
function addAttrValue() {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
}
async function save() {
  const result = await reqAddOrUpdateAttr(attrParams)
  // console.log(result)
  if (result.code === 200) {
    scene.value = 0

    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  }
  else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
</script>

<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px">
      <div v-show="scene === 0">
        <el-button type="primary" size="default" :icon="Plus" :disabled="categoryStore.c3ID ? false : true" @click="addAttr">
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px" />
          <el-table-column label="属性名称" prop="attrName" width="120px" />
          <el-table-column label="属性值名称" align="center">
            <template #default="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 5px">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <el-button type="primary" size="small" :icon="Edit" @click="updateAttr" />
            <el-button type="danger" size="small" :icon="Delete" />
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input v-model="attrParams.attrName" placeholder="请你输入属性名称" />
          </el-form-item>
        </el-form>
        <el-button :disabled="attrParams.attrName ? false : true" type="primary" size="default" :icon="Plus" @click="addAttrValue">
          添加属性值
        </el-button>
        <el-button type="warning" size="default" @click="cancel">
          取消
        </el-button>
        <el-table border style="margin: 10px,0px;" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center" />
          <el-table-column label="属性值名称" align="center">
            <template #default="{ row }">
              <el-input
                v-model="row.valueName"
                size="small" placeholder="请你输入属性值名称"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" />
        </el-table>
        <el-button type="success" size="default" @click="save">
          保存
        </el-button>
        <el-button type="warning" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
