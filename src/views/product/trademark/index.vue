<script setup lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue'

import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'

import {
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
  reqHasTrademark,
} from '@/api/product/trademark/index'

defineOptions({ name: 'Trademark' })
const dialogFormVisible = ref<boolean>(false)
const pageNo = ref<number>(1)
const limit = ref<number>(3)
// 获取el-form的组件实例
const formRef = ref()
const imageUrl = ref('')
// 存储已有品牌数据总数
const total = ref<number>(10)
// 存储已有品牌的数组
const trademarkArr = ref<Records>([])
// 获取已有品牌的接口数据
const trademarkParas = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取已有品牌接口的封装函数
async function getHasTrademark(pager = 1) {
  // 涉及是否注入回调
  pageNo.value = pager
  const result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (Number(result.code) === 200) {
    // 存储已有品牌总数
    total.value = result.data.total

    trademarkArr.value = result.data.records
  }
}
// 组件挂载完毕的钩子
onMounted(() => {
  getHasTrademark()
})
// 分页器会将下拉菜单选中的数据返回
function sizeChange() {
  // 如果数据量发生变化，就归1回到第一页
  getHasTrademark()
}
function addTrademark() {
  // 在这里清空数据
  trademarkParas.id = 0
  trademarkParas.tmName = ''
  trademarkParas.logoUrl = ''
  dialogFormVisible.value = true
  // 这里也得把之前的红字清调
  // solution1
  // formRef.value?.clearValidate("tmName");
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

function updateTrademark(row: TradeMark) {
  // console.log(row);
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogFormVisible.value = true
  Object.assign(trademarkParas, row)
}
function deleteTrademark() { }
const cancel = () => (dialogFormVisible.value = false)
async function confirm() {
  // 发请求之前，要对整个表单进行校验,等校验通过再执行后边
  // const checkResult = formRef.value.validate();
  await formRef.value.validate()
  const result: any = await reqAddOrUpdateTrademark(trademarkParas)
  // console.log(result);
  if (result.code === 200) {
    // 添加品牌成功
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParas.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 再次发请求获取已有全部的品牌数据
    getHasTrademark(trademarkParas.id ? pageNo.value : 1)
    // 这里收集数据清空不合理
    // trademarkParas.tmName= "",
    // trademarkParas.logoUrl= "",
  }
  else {
    // 失败
    dialogFormVisible.value = false
    ElMessage({
      type: 'error',
      message: trademarkParas.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}
// 图片上传成功之前就会触发
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== "image/jpeg") {
  //   ElMessage.error("Avatar picture must be JPG format!");
  //   return false;
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error("Avatar picture size can not exceed 2MB!");
  //   return false;
  // }
  // return true;
  // if (
  //   rawFile.type == 'image/png'
  //   || rawFile.type == 'image/gif'
  //   || rawFile.type == 'image/jpeg'
  // )
  if (rawFile.type.startsWith('image/')) {
    if (rawFile.size / 1024 / 1024 < 4) {
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
// response是当前这次上传图片post请求服务器返回的数据,图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // console.log(response);
  // 收集上传图片的地址，添加一个新的品牌的时候带给服务器
  trademarkParas.logoUrl = response.data
  // 图片上传成功，清除对应的图片校验结果（上传之后红字消失）
  formRef.value.clearValidate('logoUrl')
}
function validatorTmName(rule: any, value: any, callBack: any) {
  // 自定义校验规则
  if (value.trim().length >= 2)
    callBack()
  else
    callBack(new Error('品牌名称位数不得小于两位'))
}
function validatorLogoUrl(rule: any, value: any, callBack: any) {
  if (value)
    callBack()
  else
    callBack(new Error('LOGO图片为必传选项'))
}
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  // 对于logo的校验来说，trigger没有意义
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}
// 气泡确认框确认按钮的回调
async function removeTrademark(id: number) {
  const result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : 1)
  }
  else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<template>
  <div>
    <el-card>
      <el-button type="primary" size="default" :icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column label="序号" width="100px" align="center" type="index" />
        <el-table-column label="品牌名称" width="200px" align="center" prop="tmName">
          <template #default="{ row }">
            <pre style="color: green">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" width="200px" align="center">
          <template #default="{ row }">
            <img :src="row.logoUrl" alt="现在没图" style="width: 100px; height: 100px">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" width="200px" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" :icon="Edit" @click="updateTrademark(row)" />
            <el-popconfirm :title="`您确定要删除${row.tmName}吗？`" width="200px" @confirm="removeTrademark(row.id)">
              <template #reference>
                <el-button type="primary" size="small" :icon="Delete" @click="deleteTrademark" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <div class="demonstration" />
        <el-pagination
          v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 8, 10]"
          :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
          @size-change="sizeChange" @current-change="getHasTrademark"
        />
      </div>
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParas.id ? '修改品牌' : '添加品牌'">
      <el-form ref="formRef" style="width: 80%" :model="trademarkParas" :rules="rules">
        <el-form-item label="品牌名称:" label-width="80px" prop="tmName">
          <el-input v-model="trademarkParas.tmName" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="品牌logo:" label-width="80px" prop="logoUrl">
          <el-upload
            class="avatar-uploader" action="http://sph-api.atguigu.cn/admin/product/fileUpload"
            :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParas.logoUrl" :src="trademarkParas.logoUrl" class="avatar">
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
