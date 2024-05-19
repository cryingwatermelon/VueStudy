<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'

defineOptions({ name: 'SPUForm' })

const $emit = defineEmits(['changeScene'])
// 子组件点击取消，通知父组件
function cancel() {
  $emit('changeScene', 0)
}
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
