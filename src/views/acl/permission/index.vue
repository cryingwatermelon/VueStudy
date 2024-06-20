<script setup lang="ts">
import type { MenuParameter, Permission, PermissionList } from '@/api/acl/menu/type'

import { reqAddOrUpdateMenu, reqAllPermission, reqRemoveMenu } from '@/api/acl/menu'

const permissionArr = ref<PermissionList>([])
const dialogVisible = ref(false)
const menuData = reactive<MenuParameter>({
  code: '',
  level: 0,
  name: '',
  pid: 0,

})

async function getHasPermission() {
  const result = await reqAllPermission()
  // console.log(result)
  if (result.code === 200)
    permissionArr.value = result.data
}
onMounted(() => {
  getHasPermission()
})
function addPermission(row: Permission) {
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  dialogVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id
}
function updatePermission(row: Permission) {
  dialogVisible.value = true
  Object.assign(menuData, row)
}
async function save() {
  // 发请求：新增子菜单。更新某一个已有的菜单数据
  const result = await reqAddOrUpdateMenu(menuData)
  // console.log(result)
  if (result.code === 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    getHasPermission()
  }
}
async function removeMenu(id: number) {
  const result = await reqRemoveMenu(id)
  // console.log(result)
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
  getHasPermission()
}
</script>

<template>
  <div>
    <el-table :data="permissionArr" style="width: 100%; margin-bottom: 20px;" row-key="id" border>
      <el-table-column label="名称" prop="name" width="150px" />
      <el-table-column label="权限值" prop="code" />
      <el-table-column label="修改时间" prop="updateTime" />
      <el-table-column label="操作" width="250px" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" :disabled="row.level === 4" @click="addPermission(row)">
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button size="small" type="success" :disabled="row.level === 1" @click="updatePermission(row)">
            编辑
          </el-button>
          <el-popconfirm :title="`你确定删除${row.name}?`" width="250px" @confirm="removeMenu(row.id)">
            <template #reference>
              <el-button size="small" type="danger" :disabled="row.level === 1">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加对话框组件 -->
    <el-dialog
      v-model="dialogVisible"
      :title="menuData.id ? '更新菜单' : '添加菜单'"
      width="500"
    >
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="menuData.name" placeholder="请输入表单名称" />
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="menuData.code" placeholder="请输入权限值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="info" @click="dialogVisible = false">cancel</el-button>
          <el-button type="success" @click="save">save</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
