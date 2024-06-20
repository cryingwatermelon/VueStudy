<script setup lang="ts">
import { Bottom, Delete, Edit, InfoFilled, Top } from '@element-plus/icons-vue'

import type { SkuData, SkuResponseData } from '@/api/product/sku/type'

import { reqCancelSale, reqRemoveSku, reqSaleSku, reqSkuInfo, reqSkuList } from '@/api/product/sku'

const pageNo = ref(1)
const pageSize = ref(5)
const small = ref(false)
const disabled = ref(false)
const total = ref<number>(0)
const skuArr = ref<SkuData[]>([])
const drawer = ref<boolean>(false)
const skuInfo = ref({})
onMounted(() => {
  getHasSku()
})
async function getHasSku(pager = 1) {
  pageNo.value = pager
  const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  // console.log(result)
  if (result.code === 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
// 分页器下拉菜单发生变化时触发
function handler() {
  getHasSku()
}
// 上架或者下架
async function updateSale(row: SkuData) {
  // console.log(row)
  // 通过接口更新销售状态
  if (row.isSale === 0) {
    await reqSaleSku(row.id as number)
    // const result = await reqSaleSku(row.id as number)
    // console.log(result)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
    getHasSku(pageNo.value)
  }
  else {
    // const result = await reqCancelSale(row.id as number)
    // console.log(result)
    await reqCancelSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '下架成功',
    })
    getHasSku(pageNo.value)
  }
}
function updateSKu() {
  ElMessage({
    type: 'success',
    message: '努力更新中',
  })
}
async function findSku(row: SkuData) {
  drawer.value = true
  const result = await reqSkuInfo(row.id as number)
  if (result.code === 200)
    skuInfo.value = result.data
}

// function handleClose(done: () => void) {
//   ElMessageBox.confirm('Are you sure you want to close this?')
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }
async function removeSku(id: number) {
  const result = await reqRemoveSku(id)
  // console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
  // else {
  //   ElMessage({
  //     type: 'error',
  //     message: '系统数据，不能删除',
  //   })
  // }
}
</script>

<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px,0px;" :data="skuArr">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column label="名称" show-overflow-tooltip width="150px" prop="skuName" />
        <el-table-column label="描述" show-overflow-tooltip prop="skuDesc" />
        <el-table-column label="图片" width="150px">
          <template #default="{ row }">
            <img :src="row.skuDefaultImg" alt="" width="100px" height="100px">
          </template>
        </el-table-column>
        <el-table-column label="重量" width="150px" prop="weight" />
        <el-table-column label="价格" width="100px" prop="price" />
        <el-table-column label="操作" width="200px" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" :icon="row.isSale === 1 ? Bottom : Top" @click="updateSale(row)" />
            <el-button type="success" size="small" :icon="Edit" @click="updateSKu" />
            <el-button plain type="primary" size="small" :icon="InfoFilled" @click="findSku(row)" />
            <el-popconfirm :title="`Are you sure to delete ${row.skuName}?`" width="200px" @confirm="removeSku(row.id)">
              <template #reference>
                <el-button type="danger" size="small" :icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[2, 5, 8, 10]"
        :small="small"
        :disabled="disabled"
        layout="prev, pager, next,->,sizes,total"
        :total="total"
        @current-change="getHasSku"
        @size-change="handler"
      />
      <!-- 抽屉组件:展示商品详情 -->
      <el-drawer
        v-model="drawer"
        title="查看商品详情"
      >
        <template #header>
          <h4>查看商品的详情</h4>
        </template>
        <template #default>
          <el-row style="margin: 10px,0px;">
            <el-col :span="6">
              名称
            </el-col>
            <el-col :span="18">
              {{ skuInfo.skuName }}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="6">
              描述
            </el-col>
            <el-col :span="18">
              {{ skuInfo.skuDesc }}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="6">
              价格
            </el-col>
            <el-col :span="18">
              {{ skuInfo.price }}
            </el-col>
          </el-row>
          <el-row style="margin-top:  10px;">
            <el-col :span="6">
              平台属性
            </el-col>
            <el-col :span="18">
              <el-tag
                v-for="item in skuInfo.skuAttrValueList"
                :key="item.id" style="margin-left: 10px;"
              >
                {{ item.valueName }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row style="margin-top:  10px;">
            <el-col :span="6">
              销售属性
            </el-col>
            <el-col :span="18">
              <el-tag
                v-for="item in skuInfo.skuSaleAttrValueList"
                :key="item.id" style="margin-left: 10px;"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row style="margin-top:  10px;">
            <el-col :span="6">
              图片
            </el-col>
            <el-col :span="18">
              <el-carousel :interval="4000" type="card" height="150px">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%;">
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
