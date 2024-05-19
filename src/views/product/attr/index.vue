<script setup lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { handleError } from 'vue'

import type { Attr, AttrReponseData, AttrValue } from '@/api/product/attr/type'

import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'

defineOptions({ name: 'Attr' })
const categoryStore = useCategoryStore()
// 添加属性->属性值编辑模式与查看模式的切换
// const flag = ref<boolean>(true)
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
// 准备一个数组：将来存储对应的组件实例
const inputArr = ref<any>([])
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

function updateAttr(row: Attr) {
  scene.value = 1
  // 已有的属性对象赋值给parameters
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  // 数组里的赋值是浅拷贝
}
function cancel() {
  scene.value = 0
}
function addAttrValue() {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  // 获取最后的el-input组件
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
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
function toLook(row: AttrValue, $index: number) {
  // 非法情况判断
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
  }
  // 属性值去重
  const repeat = attrParams.attrValueList.find((item) => {
    if (item !== row)
      return item.valueName === row.valueName
    else return false
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
  }

  row.flag = false
}
function toEdit(row: AttrValue, $index: any) {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

async function deleteAttr(id: number) {
  const result = await reqRemoveAttr(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  }
  else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// 组件路由销毁时清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})
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
            <template #default="{ row }">
              <el-button type="primary" size="small" :icon="Edit" @click="updateAttr(row)" />
              <el-popconfirm :title="`你确定要删除 ${row.attrName} 吗？`" width="200px" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" :icon="Delete" />
                </template>
              </el-popconfirm>
            </template>
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
            <template #default="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="(vc:any) => inputArr[$index] = vc"
                v-model="row.valueName"
                size="small"
                placeholder="请你输入属性值名称" @blur="toLook(row, $index)"
              />
              <div v-else @click="toEdit(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" align="center">
            <template #default="$index">
              <el-button type="danger" size="small" :icon="Delete" @click="attrParams.attrValueList.splice($index, 1)" />
            </template>
          </el-table-column>
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
