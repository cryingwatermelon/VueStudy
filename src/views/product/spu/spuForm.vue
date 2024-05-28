<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'

import type { AllTrademark, HasSaleAttr, SpuData, SpuHasImg, SpuImg, Trademark } from '@/api/product/spu/type'

import { reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu'

defineOptions({ name: 'SPUForm' })

const $emit = defineEmits(['changeScene'])
// 子组件点击取消，通知父组件
function cancel() {
  $emit('changeScene', 0)
}
const AllTradeMark = ref< Trademark[]>([])
const imgList = ref<SpuImg[]>([])
// const allSaleAttr = ref<HasSaleAttr[]>([])
// const SpuParameter = ref<SpuData>({

// })
// 测试通信
async function initHasSpuData(spu: SpuData) {
  // 存储已有的SPU对象
  // SpuParameter.value = spu
  // 获取全部的品牌数据
  const result: AllTrademark = await reqAllTradeMark()
  // console.log(result)
  // 获取某一个品牌下全部售卖商品的图片
  const spuImageResult: SpuHasImg = await reqSpuImageList(spu.id as number)
  console.log(spuImageResult)
  const spuHasSaleAttr = await reqSpuHasSaleAttr(spu.id as number)
  // 获取整个项目全部的销售属性(eg:颜色，版本，尺码)
  const spuAllSaleAttr = await reqAllSaleAttr()
  // 存储所有拿到的数据
  AllTradeMark.value = result.data
  imgList.value = spuImageResult.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}
defineExpose({ initHasSpuData })
</script>

<template>
  <div>
    <el-card style="margin-top: 10px;">
      <el-form label-width="100px">
        <el-form-item label="SPU名称">
          <el-input placeholder="请你输入SPU名称" />
        </el-form-item>
        <el-form-item label="SPU品牌">
          <el-select style="width: 200px;">
            <el-option label="测试数据1" value="1" />
            <el-option label="测试数据2" value="2" />
            <el-option label="测试数据3" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input type="textarea" placeholder="请你输入SPU描述" />
        </el-form-item>
        <el-form-item label="SPU图片">
          <el-upload
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="SPU销售属性">
          <el-select style="width: 200px;">
            <el-option label="test1" value="1" />
          </el-select>
          <el-button style="margin-left: 20px;" type="primary" size="small" :icon="Plus">
            添加属性
          </el-button>
          <el-table border style="margin-top: 10px;">
            <el-table-column label="序号" width="80px" type="index" align="center" />
            <el-table-column label="销售属性名字" width="120px" align="left" />
            <el-table-column label="销售属性值" align="left" />
            <el-table-column label="操作" width="120px" align="center" />
          </el-table>
          <el-button style="margin-top: 10px;" type="success">
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
