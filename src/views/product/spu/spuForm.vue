<script lang="ts" setup>
import { Delete, Plus } from '@element-plus/icons-vue'
import { valueEquals } from 'element-plus'
import { placeholderSign } from 'element-plus/es/components/table-v2/src/private.mjs'
import { iconPropType } from 'element-plus/es/utils/index.mjs'

import type { AllTrademark, HasSaleAttr, SaleAttr, SaleAttrValue, SpuData, SpuHasImg, SpuImg, Trademark } from '@/api/product/spu/type'
import type { UploadUserFile } from 'element-plus'
// import type { uploadFile } from 'element-plus'

import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu'

defineOptions({ name: 'SPUForm' })

const $emit = defineEmits(['changeScene'])
// 子组件点击取消，通知父组件
function cancel() {
  $emit('changeScene', { flag: 0, params: 'update' })
}
const AllTradeMark = ref< Trademark[]>([])
const imgList = ref<UploadUserFile[]>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])
const SpuParameter = ref<SpuData>({
  category3ID: '',
  spuName: '',
  description: '',
  tmID: '',
  spuImageList: [],
  spuSaleAttrList: [],

})
// 控制对话框的显示与隐藏
const dialogVisible = ref(false)
// 收集还未选择的销售属性的ID与销售属性的名字
const saleAttrIdAndValueName = ref<string>('')
// 测试通信
async function initHasSpuData(spu: SpuData) {
  // 存储已有的SPU对象
  SpuParameter.value = spu
  // 获取全部的品牌数据
  const result: AllTrademark = await reqAllTradeMark()
  // console.log(result)
  // 获取某一个品牌下全部售卖商品的图片
  const spuImageResult: SpuHasImg = await reqSpuImageList(spu.id as number)
  // console.log(spuImageResult)
  const spuHasSaleAttr = await reqSpuHasSaleAttr(spu.id as number)
  // console.log(spuHasSaleAttr)
  // 获取整个项目全部的销售属性(eg:颜色，版本，尺码)
  const spuAllSaleAttr = await reqAllSaleAttr()
  // 存储所有拿到的数据
  AllTradeMark.value = result.data
  imgList.value = spuImageResult?.data.map((item) => {
    return {
      name: item.imgName!,
      url: item.imgUrl!,
    }
  }) || []
  saleAttr.value = spuHasSaleAttr.data

  allSaleAttr.value = spuAllSaleAttr.data
}

function handlePictureCardPreview(uploadFile: any) {
  dialogVisible.value = uploadFile.url
  dialogVisible.value = true
}
// 照片墙删除文件钩子
function handleRemove() {

}

function handleUpload(file: any) {
  if (file.type.startsWith('image/')) {
    if (file.size / 1024 / 1024 < 4) {
      return true
    }
    else {
      ElMessage({
        type: 'error',
        message: '文件的大小应该小于4M',
      })
    }
  }
  else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必为png,jpg或者gif',
    })
    return false
  }
}
// 计算当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelect = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name ! = item1.saleAttrName
    })
  })
  return unSelect
})
function addSaleAttr() {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  // 准备一个新的销售属性
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}
function toEdit(row: SaleAttr) {
  row.flag = true
  row.saleAttrValue = ''
}
function toLook(row: SaleAttr) {
  const { baseSaleAttrId, saleAttrValue } = row
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  // 非法情况判断
  if ((saleAttrValue as string).trim() === '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 判断想添加的属性值是否已经存在
  const repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  // 追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  // 切换为查看模式
  row.flag = false
}
async function save() {
  // console.log('test')
  SpuParameter.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  // 整理销售属性的数据
  SpuParameter.value.spuSaleAttrList = saleAttr.value
  const result = await reqAddOrUpdateSpu(SpuParameter.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: SpuParameter.value.id ? '更新成功' : '添加成功',
    })
    $emit('changeScene', {
      flag: 0,
      params: SpuParameter.value.id ? 'update' : 'add',
    })
  }
  else {
    ElMessage({
      type: 'error',
      message: SpuParameter.value.id ? '更新失败' : '添加失败',
    })
  }
}
// function changeScene(num: number) {
//   scene.value = num
// }
async function initAddSpu(c3ID: number | string) {
  // 先清空数据(todo)
  Object.assign(SpuParameter.value, {
    category3ID: '',
    spuName: '',
    description: '',
    tmID: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  SpuParameter.value.category3ID = c3ID
  const result: AllTrademark = await reqAllTradeMark()
  const spuAllSaleAttr = await reqAllSaleAttr()
  AllTradeMark.value = result.data
  allSaleAttr.value = spuAllSaleAttr.data
}
defineExpose({ initHasSpuData, initAddSpu })
</script>

<template>
  <div>
    <el-card style="margin-top: 10px;">
      <el-form label-width="100px">
        <el-form-item label="SPU名称">
          <el-input v-model="SpuParameter.spuName" placeholder="请你输入SPU名称" />
        </el-form-item>
        <el-form-item label="SPU品牌">
          <el-select v-model="SpuParameter.tmID" style="width: 200px;">
            <el-option v-for="(item) in AllTradeMark" :key="item.id" :value="item.id" :label="item.tmName" />
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input v-model="SpuParameter.description" type="textarea" placeholder="请你输入SPU描述" />
        </el-form-item>
        <el-form-item label="SPU图片">
          <el-upload
            v-model:file-list="imgList"
            action="http://sph-api.atguigu.cn/admin/product/fileUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible" />
        </el-form-item>
        <el-form-item label="SPU销售属性">
          <el-select
            v-model="saleAttrIdAndValueName"
            :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : `无`"
            style="width: 200px;"
          >
            <el-option
              v-for="(item) in unSelectSaleAttr"
              :key="item.id"
              :value="`${item.id}:${item.name}`"
              :label="item.name"
            />
          </el-select>
          <el-button style="margin-left: 20px;" type="primary" size="small" :icon="Plus" :disabled="saleAttrIdAndValueName ? false : true" @click="addSaleAttr">
            添加属性
          </el-button>
          <el-table border style="margin-top: 10px;" :data="saleAttr">
            <el-table-column label="序号" width="80px" type="index" align="center" />
            <el-table-column label="销售属性名字" width="120px" align="left" prop="saleAttrName" />
            <el-table-column label="销售属性值" align="left">
              <template #default="{ row }">
                <el-tag
                  v-for="(item, index) in row.spuSaleAttrValueList"
                  :key="item.saleAttrValueName"
                  style="margin-right: 5px;"
                  closable
                  class="mx-1"
                  @close="row.spuSaleAttrValueList.splice(index, 1)"
                >
                  {{ item.saleAttrValueName }}
                </el-tag>
                <el-input
                  v-if="row.flag === true"
                  v-model="row.saleAttrValue"
                  style="width: 100px;"
                  size="small"
                  placeholder="请您输入属性值"
                  @blur="toLook (row)"
                />
                <el-button
                  v-else
                  type="primary"
                  size="small"
                  :icon="Plus"
                  @click="toEdit(row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120px" align="center">
              <template #default="{ $index }">
                <el-button type="danger" :icon="Delete" size="small" @click="saleAttr.splice($index, 1)" />
              </template>
            </el-table-column>
          </el-table>
          <el-button
            :disabled="saleAttr.length > 0 ? false : true" style="margin-top: 10px;" type="success" @click="save"
          >
            保存
          </el-button>
          <el-button style="margin-top: 10px;" type="danger" @click="cancel">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>

</style>
